import { useEffect, useState } from 'react';
import fetch, { RequestInit } from 'node-fetch';

function initialState(args?: any) {
  return {
    response: null,
    error: null,
    isLoading: true,
    ...args,
  };
}

const useApi = (url: string, query = '', method, body?) => {
  const [state, setState] = useState(() => initialState());

  let params: RequestInit = {
    method,
    body: JSON.stringify(body),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/${query ? query : ''}`, params);
        if (res.status >= 400) {
          setState(
            initialState({
              error: await res.json(),
              isLoading: false,
            }),
          );
        } else {
          setState(
            initialState({
              response: await res.json(),
              isLoading: false,
            }),
          );
        }
      } catch (error: any) {
        setState(
          initialState({
            error: {
              error: error.message,
            },
            isLoading: false,
          }),
        );
      }
    };
    fetchData();
  }, [query, body]);

  return [state, setState];
};

export default useApi;
