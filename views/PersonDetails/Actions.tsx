import React, { FC } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  ButtonGroup,
  Dropdown,
  Hamburger,
  HStack,
  IconButton,
  RadioButton,
} from "@pasha28198/molequle-web-common";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const ActionsContainer = styled.div`
  display: none;

  ${({ theme }) => theme.media.greaterThan("tablet")`
    display: flex;
    justify-content: flex-end;
  `};
`;

const MobileActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  ${({ theme }) => theme.media.greaterThan("tablet")`
    display: none;
  `};
`;

interface ActionsProps {
  onPersonDetailsToggle: () => void;
  onEngage: () => void;
  groups: Array<{
    id: string;
    name: string;
  }>;
  changeGroup: (id: string) => void;
  toggleSidebar: () => void;
}

const Actions: FC<ActionsProps> = ({ onPersonDetailsToggle, onEngage, groups, changeGroup, toggleSidebar }) => {
  return (
      <Container>
        <HStack alignX="left" alignY="center" gap="S" textColor="textDark">
          <IconButton title="Toggle person details" onClick={toggleSidebar}>
            <Hamburger width="1.5rem" height="1.5rem" baseline />
          </IconButton>
          <Dropdown label={<h3>Activities</h3>} variant="inline">
            <Box
                p="M"
                bg="white"
            >
              {groups.map(({ id, name }) => (
                  <div
                      tabIndex={0}
                      role="button"
                      key={id}
                      onClick={() => changeGroup(id)}
                      onKeyDown={() => changeGroup(id)}
                  >
                    {name}
                  </div>
              ))}
            </Box>
          </Dropdown>
        </HStack>
        <ActionsContainer>
          <HStack gap="M" items="fixed">
            <Button onClick={onEngage}>
              Engage
              <svg style={{marginLeft: 5}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.91663 11.6667C2.91663 14.198 4.96865 16.25 7.49996 16.25C10.0313 16.25 12.0833 14.198 12.0833 11.6667C12.0833 9.13535 10.0313 7.08332 7.49996 7.08332C4.96865 7.08332 2.91663 9.13535 2.91663 11.6667ZM10.8114 6.86371C9.87071 6.2139 8.72978 5.83332 7.49996 5.83332C4.2783 5.83332 1.66663 8.445 1.66663 11.6667C1.66663 14.8883 4.2783 17.5 7.49996 17.5C9.3894 17.5 11.069 16.6017 12.1351 15.2089C12.5773 14.631 12.914 13.968 13.1162 13.2488C13.2576 12.7456 13.3333 12.215 13.3333 11.6667C13.3333 10.6821 13.0894 9.75452 12.6587 8.94104C12.218 8.10877 11.5819 7.39593 10.8114 6.86371ZM11.842 6.06979C12.132 6.92615 12.7606 7.62636 13.5684 8.0111C14.0021 8.21769 14.4875 8.33332 15 8.33332C16.8409 8.33332 18.3333 6.84094 18.3333 4.99999C18.3333 3.15904 16.8409 1.66666 15 1.66666C13.159 1.66666 11.6666 3.15904 11.6666 4.99999C11.6666 5.37419 11.7283 5.73399 11.842 6.06979ZM14.2147 13.928C13.712 14.3555 13.3806 14.9783 13.338 15.6792C13.3349 15.7302 13.3333 15.7816 13.3333 15.8333C13.3333 17.214 14.4526 18.3333 15.8333 18.3333C17.214 18.3333 18.3333 17.214 18.3333 15.8333C18.3333 14.4526 17.214 13.3333 15.8333 13.3333C15.2159 13.3333 14.6508 13.5571 14.2147 13.928ZM12.9166 4.99999C12.9166 6.15058 13.8494 7.08332 15 7.08332C16.1506 7.08332 17.0833 6.15058 17.0833 4.99999C17.0833 3.8494 16.1506 2.91666 15 2.91666C13.8494 2.91666 12.9166 3.8494 12.9166 4.99999ZM14.5833 15.8333C14.5833 16.5237 15.1429 17.0833 15.8333 17.0833C16.5236 17.0833 17.0833 16.5237 17.0833 15.8333C17.0833 15.143 16.5236 14.5833 15.8333 14.5833C15.1429 14.5833 14.5833 15.143 14.5833 15.8333Z" fill="white"/>
              </svg>
            </Button>
            <ButtonGroup>
              <RadioButton name="content" value="opps">
                Opps
              </RadioButton>
            </ButtonGroup>
          </HStack>
        </ActionsContainer>
        <MobileActionsContainer>
          <Dropdown label={<span>Campaigns</span>}>
            <Box bg="white" textColor="textDark" borderRadius="20px" p="S">
              <ul>
                <li>Opps</li>
              </ul>
            </Box>
          </Dropdown>
        </MobileActionsContainer>
      </Container>
  );
};

export default Actions;
