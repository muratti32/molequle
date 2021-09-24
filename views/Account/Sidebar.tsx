import React from "react";
import {Add, Box, Hidden, HStack, IconButton, Search, VStack} from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import Link from "next/link";

export const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space.L};
  width: 100%;
  height: 100%;
  background: #7e72ff;

  ${({ theme }) => theme.media.lessThan("tablet")`
    border: none;
  `};
`;

const Heading = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`
const Paragraph = styled(Heading)`
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 8px;
`

const Adding = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const AddIcon = styled(Add)`
  margin-right: 6px;
  width: 20px;
`
const AddingText = styled(Heading)`
  font-weight: 700;
`

interface SidebarProps {
  onSearchShow: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSearchShow }) => {
  return (
    <StyledContent>
      <HStack alignX="evenly" alignY="center">
        <h3>Accounts</h3>
        <Hidden below="tablet">
          <IconButton title="Search people" onClick={() => onSearchShow()}>
            <Search width="1.75em" height="1.75em" />
          </IconButton>
        </Hidden>
      </HStack>
      <Box
          // @ts-ignore
          mt="L"
      >
        <VStack gap="XS">
          <Heading>
              Lorem Ipsum dolor
          </Heading>
            <Paragraph>
                Some Segment Name
            </Paragraph>
            <Paragraph>
                Very Long Segment Name Her...
            </Paragraph>
            <Adding>
                <AddIcon/>
                <AddingText>
                    New Account Segment
                </AddingText>
            </Adding>
        </VStack>
      </Box>
    </StyledContent>
  );
};

export default Sidebar;
