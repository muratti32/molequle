import React, { useState } from 'react';
import { Add, Box, Button, Flex, Hidden, Pagination } from '@pasha28198/molequle-web-common';
import List from './List';
import LatestActivities from './LatestActivities';
import styled from '@emotion/styled';

interface ContentProps {
  latestActivities?: null | any;
  columns: any;
  data: any;
  page: number;
  nextPage: boolean | undefined;
  setFilters: any;
}

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ListWrapper = styled.div`
  width: 80%;
  ${({ theme }) => theme.media.lessThan('fullhd')`
   width: 100%;
  `};
`;

const AddButton = styled(Button)`
  ${({ theme }) => theme.media.greaterThan('tablet')`
     display: none;
  `}
  position: absolute;
  right: 18px;
  bottom: 18px;
`;

const AddIcon = styled(Add)`
  width: 20px;
  height: 20px;
  svg {
    path {
      fill: #ffffff;
    }
  }
`;

const Content: React.FC<ContentProps> = ({ latestActivities, nextPage, page, setFilters }) => {
  const [toggleButton, setToggleButton] = useState<boolean>(false);

  return (
    <Box
      // @ts-ignore
      mt='M'
      p={{ default: 'NONE', tablet: 'XL' }}
    >
      <Hidden below='mobile'>
        <Flex
          direction={{ default: 'column', fullhd: 'row' }}
          gap={{ default: 'NONE', fullhd: 'M' }}
          alignY={{ default: 'center', fullhd: 'start' }}
        >
          <ListWrapper>
            <List />
            <PaginationWrapper>
              {page === 1 && !nextPage ? null : (
                <Pagination
                  nextStep={nextPage}
                  initPage={page}
                  onUpdate={(newPage: number) =>
                    setFilters((prev: any) => {
                      return { ...prev, page: newPage };
                    })
                  }
                />
              )}
            </PaginationWrapper>
          </ListWrapper>
          {latestActivities && <LatestActivities />}
          <AddButton onClick={() => setToggleButton((prev) => !prev)}>
            {toggleButton && 'New Person '}
            <AddIcon />
          </AddButton>
        </Flex>
      </Hidden>
    </Box>
  );
};

export default Content;
