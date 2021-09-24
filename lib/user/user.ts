import axios from 'axios';

export const Endpoints = {
  ME: '/api/auth/me',
  DOMAIN: 'https://onemedia-consuting-molequle.eu.auth0.com',
  UPDATE_USER_LOCALE: '/api/users/update/',
  GET_ACCESS_TOKEN: '/oauth/token',
  UPDATE_USER: '/api/v2/users/',
  RESET_PASSWORD: '/dbconnections/change_password/',
  V2: '/api/v2',
};

export const fetchUser = async (): Promise<Response | null> => {
  const res = await fetch(Endpoints.ME);

  if (!res.ok) {
    return null;
  }

  return res.json();
};

const axiosInstance = axios.create();

export const resetPassword = async (data: any): Promise<Response | null> => {
  return await axiosInstance.post(
    Endpoints.DOMAIN + Endpoints.RESET_PASSWORD,
    {
      client_id: process.env.AUTH0_CLIENT_ID,
      email: data.email,
      connection: 'Username-Password-Authentication',
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const updateUser = async (id: string, data: any) => {
  const token: any = await axios
    .post(
      Endpoints.DOMAIN + Endpoints.GET_ACCESS_TOKEN,
      {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: Endpoints.DOMAIN + Endpoints.V2,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    .then(async (res) => {
      const update: any = await axiosInstance.patch(
        Endpoints.DOMAIN + Endpoints.UPDATE_USER + id + '/identities',
        {
          name: data.name,
          email: data.email,
          nickname: data.nickname,
          picture: data.picture,
          connection: 'Username-Password-Authentication',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${res.data.access_token}`,
          },
        },
      );
    });
};
