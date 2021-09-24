import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import fetch, { RequestInit } from 'node-fetch';

export default withApiAuthRequired(async function deleteView(req, res) {
  // const { accessToken } = await getAccessToken(req, res);
  // const url = `${process.env.NEXT_PUBLIC_API_HOST}/people${req.query.page ? `/?page=${req.query.page}` : ''}`;
  console.log('id', req.query.id);
  let params: RequestInit = {
    headers: {
      Authorization: 'Token e10daed0a38225816452370c003a3ded',
      'Content-Type': 'application/json',
    },
    method: 'delete',
  };

  const response = await fetch(`http://20.54.135.214/api/people/views/${req.query.id}`, params);
  if (response.status === 204) {
    res.status(204).json({ message: 'Successfully deleted' });
  } else {
    res.status(500).json({ message: "Server error, couldn't delete" });
  }
});
