import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function people(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/people${req.query.page ? `/?page=${req.query.page}` : ''}`;
  console.log("halo")
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let people = await response.json();
  const results = people.results.map((r) => {
    return { ...r, account: r.account.name };
  });
  people = { ...people, results };
  res.status(200).json(people);
});
