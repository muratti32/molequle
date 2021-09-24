import React, { FC } from "react";
import styled from "@emotion/styled";
import {
  Add,
  ArrowRight,
  Button,
  Hamburger,
  Hidden,
  HStack,
  IconButton,
  Search,
  TextInput,
} from "@pasha28198/molequle-web-common";

const ActionsContainer = styled.div`
  position: relative;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const AddIcon = styled(Add)`
  width: 20px;
  height: 20px;
  margin-left: 6px;
  svg {
    path {
      fill: #ffffff;
    }
  }
`

const AddButton = styled(Button)`
  ${({ theme }) => theme.media.lessThan("tablet")`
     display: none;
  `}
`

const SearchContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textDark};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translate3d(${({ isVisible }) => (isVisible ? 0 : "100%")}, 0, 0);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);

  input {
    border: 1px solid ${({ theme }) => theme.colors.gainsboro};
    border-radius: 10px;
    height: 90%;
    width: 90%;
    margin-left: ${({ theme }) => theme.space.XXS};
    background: ${({ theme }) => theme.colors.grayLight};
  }
`;

interface ActionsProps {
  onCategoriesToggle: () => void;
  isSearchVisible: boolean;
  onSearchToggle: (isVisible: boolean) => void;
  toggleSidebar?: any;
}

const Actions: FC<ActionsProps> = ({ onCategoriesToggle, onSearchToggle, isSearchVisible, toggleSidebar }) => {
  return (
    <ActionsContainer>
      <HStack alignX="left" alignY="center" gap="S" textColor="textDark">
        <IconButton title="Toggle people categories" onClick={toggleSidebar}>
          <Hamburger width="1.5rem" height="1.5rem" baseline />
        </IconButton>
        <h3>Best Bets</h3>
      </HStack>
      <HStack alignX="left" alignY="center" gap="S">
        <AddButton>New Person <AddIcon /></AddButton>
      </HStack>
      <SearchContainer isVisible={isSearchVisible}>
        <IconButton
          tabIndex={isSearchVisible ? 0 : -1}
          title="Hide search bar"
          onClick={() => onSearchToggle(false)}
        >
          <ArrowRight width="1.25em" height="1.25em" />
        </IconButton>
        <TextInput tabIndex={isSearchVisible ? 0 : -1} />
      </SearchContainer>
    </ActionsContainer>
  );
};

export default Actions;
