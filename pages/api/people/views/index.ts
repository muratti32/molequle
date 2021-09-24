import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import fetch, { RequestInit } from 'node-fetch';

export default withApiAuthRequired(async function postViews(req, res) {
  // const { accessToken } = await getAccessToken(req, res);
  // const url = `${process.env.NEXT_PUBLIC_API_HOST}/people${req.query.page ? `/?page=${req.query.page}` : ''}`;

  let params: RequestInit = {
    headers: {
      Authorization: 'Token e10daed0a38225816452370c003a3ded',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: req.body,
  };

  const response = await fetch(`http://20.54.135.214/api/people/views`, params);
  const result = await response.json();
  // res.status(200).json(result);
  return res.end(JSON.stringify(result));
});
