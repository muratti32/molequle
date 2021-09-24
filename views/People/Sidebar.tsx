import React, { FC, useContext, useEffect, useState } from 'react';
import {
  Box,
  Close,
  Hidden,
  HStack,
  IconButton,
  Search,
  VStack,
  theme,
} from '@pasha28198/molequle-web-common';
import styled from '@emotion/styled';
import useApi from '../../lib/use-api';
import { FilterContext } from '../../services/people/filter.context';

const ViewLabel = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.XXS} ${theme.space.M}`};
  border-radius: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  & > * + * {
    margin-left: 0.25rem;
  }

  &:hover {
    & > button {
      background: #7e72ff;
      opacity: 1;
    }
  }

  & > button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: ${theme.space.XS};
    margin: 0;
    border-radius: 0 15px 15px 0;
    visibility: none;
    opacity: 0;
    transition: all 0.3s ease-out;

    @media (hover: none) {
      border-left: 1px solid ${theme.colors.gainsboro};
      background: inherit;
      opacity: 1;
    }
  }

  @media (hover: none) {
    padding-right: ${({ theme }) => `calc(${theme.space.S} + 1.25em)`};
  }
`;

export const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space.L};
  width: 100%;
  height: 100%;
  background: #7e72ff;

  ${({ theme }) => theme.media.lessThan('tablet')`
    border: none;
  `};
`;

interface SidebarProps {
  onSearchShow: () => void;
  updateFilter: (filterBody: any) => void;
  onRemove: (e: any, id: number) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSearchShow, updateFilter, onRemove }) => {
  const [selectedView, setSelectedView] = useState<any>(null);
  const [viewList, setViewList] = useState<any>([]);
  const { views } = useContext(FilterContext);

  useEffect(() => {
    setViewList(views.results || []);
  }, [views]);

  useEffect(() => {
    if (selectedView) {
      updateFilter(selectedView.filter);
    }
  }, [selectedView]);

  const handleSelect = (view: any) => {
    setSelectedView(view);
  };

  const handleRemove = (e: any, viewId: any) => {
    e.stopPropagation();
    onRemove(e, viewId);
    // setViewList(peopleViews.results.filter((v) => v.id !== viewId));
  };

  return (
    <StyledContent>
      <HStack alignX='evenly' alignY='center'>
        <h3>People</h3>
        <IconButton title='Search people' onClick={() => onSearchShow()}>
          <Search width='1.75em' height='1.75em' />
        </IconButton>
      </HStack>
      <Box
        // @ts-ignore
        mt='L'
      >
        <VStack gap='XS'>
          {viewList.length > 0 &&
            viewList.map((r) => {
              return (
                <ViewLabel key={r.name} onClick={() => handleSelect(r)}>
                  {r.name}
                  <IconButton
                    title='Remove filter'
                    /* @ts-ignore */
                    // className={removeButtonStyles(theme, error).name}
                    onClick={(e) => handleRemove(e, r.id)}
                  >
                    <Close width='1.25em' height='1.25em' />
                  </IconButton>
                </ViewLabel>
              );
            })}
        </VStack>
      </Box>
    </StyledContent>
  );
};

export default Sidebar;
