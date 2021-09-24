import React, { useEffect } from 'react';
import { UserProvider, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';
import Error from 'next/error';
import { Layout, Notifications, theme } from '@pasha28198/molequle-web-common';
import { QueryCache } from 'react-query';
import Head from 'next/head';
import { Provider } from '../components';
import '../fonts.css';
import { GetServerSideProps } from 'next';
import { parseAfterPromiseAll } from '../util/helpers';
import { fetchPersonFields } from '../lib/persons';
import { fetchAccountFields } from '../lib/accounts';
import { UsersProvider } from '../api/users.api';

const queryCache = new QueryCache();
const CSRF_ENDPOINT = '/api/csrf';

const MainApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    fetch(CSRF_ENDPOINT).catch((err) => {
      throw err;
    });
  }, []);

  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode || 500} title={pageProps.error.message} />;
  }

  return (
    <UserProvider loginUrl='/api/auth/login' profileUrl='/api/auth/me'>
      <Provider theme={theme} queryCache={queryCache} dehydratedState={pageProps.dehydratedState}>
        <Layout>
          <Head>
            <link rel='stylesheet' href='//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css' />
            <link rel='preload' href='/fonts/Gilroy/Gilroy-Regular.otf' as='font' crossOrigin='' />
            <link rel='preload' href='/fonts/Gilroy/Gilroy-Bold.otf' as='font' crossOrigin='' />
          </Head>
          <Component {...pageProps} />
        </Layout>
        <Notifications />
      </Provider>
    </UserProvider>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    let props;
    try {
      // TODO remove hardcoded {id} block
      props = parseAfterPromiseAll(
        await Promise.all([
          fetchPersonFields(),
          fetchAccountFields(),
          UsersProvider.getUserInfo({ id: 1 }),
          UsersProvider.getToken(),
        ]),
        ['personFieldsPrefetched', 'accountFieldsPrefetched', 'userInfo', 'access_token'],
      );

      console.log(props);

      // @ts-ignore
      return { props: JSON.parse(JSON.stringify(props)) };
    } catch (e) {
      console.log(e);
      context.res.writeHead(302, { Location: '/' }).end();
    }
    return { props: { errorProp: 'true' } };
  },
});

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {
//         // TODO remove hardcoded {id} block
//         const props = parseAfterPromiseAll(
//             await Promise.all([
//                 fetchPersonFields(),
//                 fetchAccountFields(),
//                 UsersProvider.getUserInfo({ id: 1 }),
//                 UsersProvider.getToken(),
//             ]),
//             ["personFieldsPrefetched", "accountFieldsPrefetched", "userInfo", "access_token"],
//         );

//         console.log(props)

//         // @ts-ignore
//         return withPageAuthRequired({ props: JSON.parse(JSON.stringify(props)) })(context);
//     } catch (e) {
//         console.log(e)
//         context.res.writeHead(302, { Location: "/" }).end();
//     }
//     // @ts-ignore
//     return withPageAuthRequired({ props: {} })(context);
// };

export default MainApp;
