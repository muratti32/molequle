import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function accounts(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/accounts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const accounts = await response.json();
  res.status(200).json(accounts);
});
