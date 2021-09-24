import React, { FC } from 'react';
import { Box, Flex, Star, VStack } from '@pasha28198/molequle-web-common';
import styled from '@emotion/styled';
import { Accordion, AccordionItem } from '../../components';

const data = [
  {
    date: 22,
    month: 'May',
    items: [
      {
        title: 'John Doe',
        action: 'Milestone',
        text: 'Lorem Ipsum dolor sit amet consecutor ipsum.',
      },
      {
        title: 'Max Muster',
        action: 'Email',
        text: 'Lorem Ipsum dolor sit amet consecutor ipsum.',
      },
    ],
  },
  {
    date: 15,
    month: 'Apr',
    items: [
      {
        title: 'Jane Doelong',
        action: 'Milestone',
        text: 'Lorem Ipsum dolor sit amet consecutor ipsum.',
      },
    ],
  },
];

const FlexWrapper = styled(Flex)`
  ${({ theme }) => theme.media.lessThan('fullhd')`
   width: 100%;
  `};
`;

const Wrapper = styled(Box)`
  background: #edf1f2;
  color: ${({ theme }) => theme.colors.textDark};
  border-radius: 10px;
  width: 100%;
  ${({ theme }) => theme.media.lessThan('fullhd')`
   width: 100%;
  `};
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 20px;
    margin-right: 6px;
  }
`;

const Heading = styled.h2`
  padding: 12px 18px;
  border-bottom: 1px solid #dbe4e5;
`;

const AccordionWrapper = styled.div`
  padding: 12px 18px;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Date = styled.div`
  margin-right: 10px;
  width: 28px;
  min-width: 28px;
  h2 {
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: #2d3958;
    margin: 0;
  }
  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #2d3958;
    margin: 0;
  }
`;

const ActionsWrapper = styled.div`
  background: #ffffff;
  border-radius: 4px;
  width: 100%;
`;

const Action = styled.div`
  padding: 10px 14px;
  border-bottom: 1px solid #dbe4e5;
  width: 100%;
  h3 {
    margin: 0;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: #2d3958;
  }
  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    margin: 0;
  }
`;

const LatestActivities: FC = () => {
  return (
    <FlexWrapper>
      <Wrapper>
        <VStack>
          <Heading>Latest Activities</Heading>
          <AccordionWrapper>
            <Accordion>
              <AccordionItem
                label={
                  <LabelWrapper>
                    <Star />
                    Interesting Moments
                  </LabelWrapper>
                }
                id={'Interesting moments'}
                start={true}
              >
                {data.map((data: any, index: number) => {
                  return (
                    <DateWrapper key={index}>
                      <Date>
                        <h2>{data.date}</h2>
                        <p>{data.month}</p>
                      </Date>
                      <ActionsWrapper>
                        {data.items.map((data: any, index: number) => {
                          return (
                            <Action key={index}>
                              <h3>{data.title}</h3>
                              <p>
                                <i>{data.action}</i>: {data.text}
                              </p>
                            </Action>
                          );
                        })}
                      </ActionsWrapper>
                    </DateWrapper>
                  );
                })}
              </AccordionItem>
            </Accordion>
          </AccordionWrapper>
        </VStack>
      </Wrapper>
    </FlexWrapper>
  );
};

export default LatestActivities;
