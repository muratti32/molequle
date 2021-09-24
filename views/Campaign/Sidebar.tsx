import React, { FC } from "react";
import { Hidden, HStack, IconButton, Search } from "@pasha28198/molequle-web-common";
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

interface SidebarProps {
  onSearchShow: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onSearchShow }) => {
  return (
    <StyledContent>
      <HStack alignX="evenly" alignY="center">
        <h3>Campaigns</h3>
        <Hidden below="tablet">
          <IconButton title="Search people" onClick={() => onSearchShow()}>
            <Search width="1.75em" height="1.75em" />
          </IconButton>
        </Hidden>
      </HStack>
      {/* <Box mt="L">
        <VStack gap="XS">
          <Link href="#">Best bets</Link>
          <Link href="#">Lead lifecycle</Link>
          <Link href="#">Lorem ipsum</Link>
        </VStack>
      </Box> */}
    </StyledContent>
  );
};

export default Sidebar;
