import React from 'react'
import { useRouter } from "next/router";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import People from "./people";

const namespace = "https://api.molequle.io";

export default (): React.ReactNode => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user || error) {
    return error;
  }

  // @ts-ignore
  const isUserHasPermission = (user[`${namespace}/permissions`] || []).includes("read:person")

  return (
      //@ts-ignore
    <People />
  );
};

export const getServerSideProps = withPageAuthRequired();