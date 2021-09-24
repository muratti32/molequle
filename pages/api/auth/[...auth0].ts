import { URL } from 'url';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleAuth, handleLogin, handleCallback, handleLogout, LoginOptions } from '@auth0/nextjs-auth0';

const ORG_IDS: Record<string, string> = {
  'tenant-1': 'org_BvB3upzXO7r2ZIgl',
  'tenant-2': 'org_rgSmHWPvhexEAXRm',
};
const BASE_URL = process.env.AUTH0_BASE_URL as string;
const BASE_HOST_NAME = BASE_URL.replace(/https?:\/\//i, '');
const BASE_PROTOCOL = BASE_URL.startsWith('https://') ? 'https://' : 'http://';
const ALL_SCOPES = [
  'openid',
  'profile',
  'email',
  'offline_access',
  'read:person',
  'write:person',
  'read:account',
  'write:account',
  'read:activity',
  'write:activity',
  'read:opportunity',
  'write:opportunity',
  'read:campaign',
  'write:campaign',
];

// cache org name regex to check for tenant specific URLs or retrieve the tenant/org name
const orgNameRegex = new RegExp(`([^.]*)\.${BASE_HOST_NAME.replace(/\./g, '\\.')}`, 'i');

/**
 * A organisation id is required for Auth0 to show the tenant specific login page. Since we only
 * know about the tenant/organisation name for most request (by extracting it from the URL), we need
 * to infer the organisation's id from the name.
 *
 * @todo Get the org id for a particular org name from the API (/tenants). This mapping can be
 *       cached for a certain time as the organisation mapping only changes if new tenants are added
 */
function getOrgId(orgName: string): string | undefined {
  return ORG_IDS[orgName];
}

/**
 * Ensure that the return to URL is absolute (organization specific). This function also overwrites
 * any malicious URL being passed to the login route.
 */
function getReturnTo(path: string = '/', orgName: string = '') {
  const url = new URL(path, BASE_URL);
  if (!orgNameRegex.test(url.host)) {
    url.host = `${orgName}.${BASE_HOST_NAME}`;
  }
  return url.toString();
}

function getOrgName(hostname: string = '') {
  const [, orgName] = hostname.match(orgNameRegex) || [];
  return orgName;
}

/**
 * Get login options depending on the current URL. If the user used the generic URL, i.e.
 * https://app.molequle.io, we use the default auth params without an `organization` attribute. If
 * this attribute is not specified, Auth0 will show the organization prompt that asks users for an
 * organisation name. If we can extract the organisation name from the URL, we attempt to map it
 * to an organisation id which is passed to Auth0 as an auth parameter (`authorizationParams`).
 */
function getLoginOptions(req: NextApiRequest, res: NextApiResponse): LoginOptions {
  const authorizationParams: LoginOptions['authorizationParams'] = {
    response_type: 'code',
    scope: ALL_SCOPES.join(' '),
  };
  const orgName = getOrgName(req.headers.host);
  if (!orgName) {
    // append the custom query parameter "returnTo" to the auth query string, i.e.
    // `authorizationParams`, in order to ensure that the "returnTo" URL can be accessed in the
    // Auth0 action (redirects to the tenant specific subdomain)
    authorizationParams.returnTo = req.query.returnTo || '/';
    authorizationParams.audience = 'https://api.molequle.io';

    // explicitly set the redirect_uri (also set by default) which is used in the Auth0 action
    // to figure out whether the auth process was initiated on the generic or tenants specific URL
    authorizationParams.redirect_uri = `${BASE_PROTOCOL}${BASE_HOST_NAME}/api/auth/callback`;
    return { authorizationParams };
  }

  const orgId = getOrgId(orgName);
  if (!orgId) {
    // TODO: Redirect to proper error page
    res.status(400).end('unable to resolve tenant name');
  }

  const returnTo = getReturnTo(req.query.returnTo as string | undefined, orgName);
  return {
    authorizationParams: {
      ...authorizationParams,
      audience: `https://${orgName}.api.molequle.io`,
      redirect_uri: `${BASE_PROTOCOL}${orgName}.${BASE_HOST_NAME}/api/auth/callback`,
      organization: orgId,
      returnTo,
    },
    returnTo,
  };
}

export default handleAuth({
  /**
   * Generally speaking, there are two difference auth flows that can occour:
   *
   * 1. User uses a tenant specific domain to access the application
   *
   * For this use-case, `handleLogin` will send the organisation id to the Auth0 login page. After
   * logging in, Auth0 will redirect to the callback page (`callback` method) to retrieve the
   * tokens (Oauth authorization code grant).
   *
   * 2. User uses the generic domain to access the application
   *
   * The authentication flow for this use-case is more complex and will trigger the `login`
   * function twice:
   * 1. User without a valid session visits https://app.molequle.io.
   * 2. The Next.js application redirects the user to this route, i.e.
   *    https://app.molequle.io/api/auth/login, via the `withPageAuthRequired` method
   *    (Auth0 Next.js SDK). This invokes this `login` method.
   * 3. Since we don't know the user's organisation at this point, we can't pass the organisation
   *    to the Auth0 universal login page. Auth0 will therefore show the organisation prompt page
   *    (https://auth0.onemedia-consulting.com/...) asking the user to enter an organisation name.
   * 4. The user fills in their organisation name and proceeds to Auth0's login page for the
   *    respective organisation.
   * 5. After logging in, an Auth0 action (Node.js function) is run which detects that the auth
   *    process was initiated on the generic domain (is checked via the `redirect_uri` query
   *    parameter). Sicne the user entered the organisation name in the promopt, this action
   *    redirects the user to https://TENANT.app.molequle.io/api/auth/login.
   * 6. This invokes this `login` method a second time. However, since we can now infer the
   *    organisation name from the URL, the auth process is initiated again, see use case 1 above
   *    ("User uses a tenant specific domain to access the application").
   *
   * It may seem counter intuitive to redirect the user to the login page after they already
   * authenticated but since a session on the Auth0 universal login page was already established, the
   * user is not asked for their credentials the second time.
   */
  async login(req, res) {
    try {
      await handleLogin(req, res, getLoginOptions(req, res));
    } catch (error) {
      // TODO: Redirect to proper error page
      res.status(error.status || 500).end(error.message);
    }
  },

  /**
   * The callback is invoked after the user logged in successfully. `handleCallback` will fetch
   * the refresh, id and access tokens via a `code` provided in the query string (oAuth
   * authorization code grant) and store these tokens in a HTTP only cookie. Client side request
   * to the Molequle API therefore need to be proxied via Next.js API routes.
   *
   * Also, `handleCallback` expects the `state` query parameter to be identical to the one that
   * the SDK saves in a cookie (executed during the login (`handleLogin`)). A redirect to this
   * callback route will therefore only work if done after the user logs in on the Auth0 universal
   * login page.
   */
  async callback(req, res) {
    try {
      const orgName = getOrgName(req.headers.host);
      if (!orgName) {
        // this case is highly unlikely as we ensure (in `login` via custom login options) and the
        // Auth0 action that the user is on a tenant specific URL at this point
        // TODO: Redirect to proper error page; Since the Auth0 action will always redirect
        return res.status(400).end('unable to resolve tenant name');
      }
      await handleCallback(req, res, {
        redirectUri: `${BASE_PROTOCOL}${orgName}.${BASE_HOST_NAME}/api/auth/callback`,
      });
    } catch (error) {
      // TODO: Redirect to proper error page
      res.status(error.status || 400).end(error.message);
    }
  },

  async logout(req, res) {
    try {
      await handleLogout(req, res, {
        returnTo: BASE_URL,
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
