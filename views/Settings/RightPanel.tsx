import React, { FC } from "react";
import { Avatar, Box, Heading } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { Endpoints, fetchUser } from "../../lib/user";

export const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space.L};
  border-left: 1px solid #8d82ff;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.media.lessThan("tablet")`
    border: none;
  `};
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px 0;
`;

const RightPanel: FC = () => {
  const { data: user } = useQuery<any>(Endpoints.ME, fetchUser, {
    staleTime: Infinity,
  });

  return (
    <StyledContent>
      <Box py="M"
          // @ts-ignore
           css={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Avatar src={user.picture} size="large" />
      </Box>
      <h1
          // @ts-ignore
          css={{ textAlign: "center" }}
      >{user.nickname}</h1>
      <h2
          // @ts-ignore
          css={{ textAlign: "center", marginBottom: 30, fontSize: 12, fontWeight: 400 }}
      >
        {user.name}
      </h2>

      <InfoBlock>
        <Heading level={4}>Phone Number</Heading>
        <span>+380 66 232 22 32</span>
        <Heading level={4}>Department</Heading>
        <span>Lorem ipsum</span>
      </InfoBlock>
      <InfoBlock>
        <Heading level={4}>Password</Heading>
        <span>Last change: 2 days ago</span>
      </InfoBlock>
      <InfoBlock>
        <Heading level={4}>Two-Step Verification</Heading>
        <span>Verified</span>
      </InfoBlock>
    </StyledContent>
  );
};

export default RightPanel;
