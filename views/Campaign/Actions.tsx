import React, {useState} from "react";
import styled from "@emotion/styled";
import {
    ArrowRight,
    Hamburger,
    Button,
    Hidden,
    HStack,
    IconButton,
    Search,
    TextInput,
    Add, Dropdown, Box
} from "@pasha28198/molequle-web-common";

const ActionsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

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
  toggleSidebar: () => void;
  button?: boolean;
  items: string[];
  dropdown?: boolean;
  label?: string;
}

const EngageButton = styled(Button)`
  ${({ theme }) => theme.media.lessThan("tablet")`
     display: none;
  `}`

const EngageIcon = styled(Add)`
  width: 20px;
  height: 20px;
  svg {
    path {
      fill: #ffffff;
    }
  } 
`

const Drop = styled(Dropdown)`
  z-index: 9999;
`
const DropItem = styled.p`
  padding: 5px 10px;
`


const Actions: React.FC<ActionsProps> = ({
  onCategoriesToggle,
  onSearchToggle,
  toggleSidebar,
  isSearchVisible,
  button = false,
  items,
  dropdown= false,
  label= ''
}) => {

  const [chooseItem, setChooseItem] = useState<string>(items[0])

  return (
    <ActionsContainer>
      <HStack alignX="left" alignY="center" gap="S" textColor="textDark">
        <IconButton title="Toggle people categories" onClick={() => {
            toggleSidebar()
        }}>
          <Hamburger width="1.5rem" height="1.5rem" baseline />
        </IconButton>
          {dropdown ? <Drop
              label={<h3>{chooseItem + ' '}</h3>}
              variant="inline"
          >
              {items.map((data: string, index: number) => {
                  return (
                      <Box key={index} onClick={() => setChooseItem(data)}>
                          <DropItem>{data}</DropItem>
                      </Box>
                  )
              })}
          </Drop> : <h3>{label}</h3>}
      </HStack>
      <HStack alignX="left" alignY="center" gap="S">
        <Hidden above="desktop">
          <IconButton title="Search people" onClick={() => onSearchToggle(true)}>
            <Search width="1.75em" height="1.75em" />
          </IconButton>
        </Hidden>
          {button && <EngageButton>Engage <EngageIcon/></EngageButton>}
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
