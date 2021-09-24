import { URL } from "url";
import { handleLogin } from "@auth0/nextjs-auth0";

// TODO: Copied from /auth
function getOrgName(hostname) {
  const matches = hostname.match(/([^.]*)\.localhost(?::\d{2,4})?/i);
  return Array.isArray(matches) ? matches[1] : null;
}

export default async function invite(req, res) {
  try {
    const { invitation, organization } = req.query;
    const orgName = getOrgName(req.headers.host);
    if (!orgName && invitation && organization) {
      // Redirect to organization specific url before starting the authorization
      // as redirecting via a rule adds a certain amount of overhead, see login handler
      const redirectURI = new URL(req.url, `http://${orgName}.localhost:3000`);
      redirectURI.searchParams.set("invitation", invitation);
      redirectURI.searchParams.set("organization", organization);
      return res.redirect(redirectURI.toString);
    }

    // No need to validate query params as Auth0 will show the login page in case
    // the params are invalid or not set
    await handleLogin(req, res, {
      authorizationParams: {
        invitation,
        organization,
      },
    });
  } catch (error) {
    // TODO: Redirect to proper error page
    res.status(error.status || 500).end(error.message);
  }
}
