import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Account from "../../views/Settings/Account";
import Password from "../../views/Settings/Password";
import { Details } from "../../components/Details";
import { ProfileView } from "../../views";
import { Endpoints, fetchUser } from "../../lib/user";
import StepVerification from "../../views/Settings/StepVerification";
import styled from "@emotion/styled";

const Content = styled(Details.Content)`
  margin-top: 25px;
  ${({ theme }) => theme.media.lessThan("fullhd")`
   max-width: 500px
  `};
    ${({ theme }) => theme.media.lessThan("tablet")`
   padding: 10px;
  `};
`

export default (): React.ReactNode => {
  const router = useRouter();
  const { data: user, isLoading, error } = useQuery(Endpoints.ME, fetchUser, {
    staleTime: Infinity,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user || error) {
    router
      .push("/api/login")
      .then(() => {})
      .catch(() => {});
    return null;
  }

  console.log(router)

  return (
    <ProfileView>
      <Details.Container background={false}>
        <Content>
          <Account />
          <Password />
          <StepVerification />
        </Content>
      </Details.Container>
    </ProfileView>
  );
};
