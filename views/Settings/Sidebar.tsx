import React, { FC } from "react";
import { HStack, Heading } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";

export const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space.L};
  width: 100%;
  height: 100%;
  background: #7e72ff;

  ${({ theme }) => theme.media.lessThan("tablet")`
    border: none;
  `};
`;

const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const NavTitle = styled(Heading)`
  margin-top: 10px;
`;

const Nav = styled.span`
  font-size: 14px;
  font-weight: normal;
  padding: 10px 0;
`;

const Sidebar: FC = () => {
  return (
    <StyledContent>
      <HStack alignX="evenly" alignY="center">
        <h3>Settings</h3>
      </HStack>
      <div>
        <NavBlock>
          <NavTitle level={4}>GENERAL</NavTitle>
          <Nav>Account</Nav>
          <NavTitle level={4}>SECURITY</NavTitle>
          <Nav>Password</Nav>
          <Nav>Two-Step Verification</Nav>
        </NavBlock>
      </div>
    </StyledContent>
  );
};

export default Sidebar;
