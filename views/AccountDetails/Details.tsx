import React, { FC } from "react";
import { ArrowDown, Box, Group, Heading, HStack, Line, NewTab, Skeleton, VStack } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import { ResultsType } from "../../api/account.api";

export const StyledContent = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.L};
  background: ${({ theme }) => theme.colors.purple};
  color: #ffffff;
  flex: 0 0 auto;
  border-left: 1px solid #ffffff;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.media.lessThan("tablet")`
    border: none;
  `};
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Loader: React.FC = () => {
  return (
    <>
      <VStack>
        <Box view="flex">
          <Skeleton
              // @ts-ignore
              css={{ flex: "1 0 auto" }}
          >
            <Line width={0.95} />
          </Skeleton>
          <ArrowDown baseline />
        </Box>
        <Box
            // @ts-ignore
            my="M"
        >
          <Skeleton>
            <Group>
              <Line width={0.6} dimmed />
              <Line />
            </Group>
            <Group>
              <Line width={0.3} dimmed />
              <Line width={0.75} />
            </Group>
            <Group>
              <Line width={0.6} dimmed />
              <Line />
            </Group>
            <Group>
              <Line width={0.2} dimmed />
              <Line width={0.75} />
            </Group>
            <Group>
              <Line width={0.2} dimmed />
              <Line width={0.75} />
            </Group>
          </Skeleton>
        </Box>
        <HStack alignX="left" alignY="center" gap="XXS">
          <h2>Molequle</h2>
          <ArrowDown baseline />
          <NewTab baseline />
        </HStack>
        <Box
            // @ts-ignore
            my="M"
        >
          <Skeleton>
            <Group>
              <Line width={0.3} dimmed />
              <Line width={0.75} />
            </Group>
            <Group>
              <Line width={0.6} dimmed />
              <Line />
            </Group>
            <Group>
              <Line width={0.2} dimmed />
              <Line width={0.75} />
            </Group>
            <Group>
              <Line width={0.2} dimmed />
              <Line width={0.75} />
            </Group>
          </Skeleton>
        </Box>
      </VStack>
    </>
  );
};

const Content = ({ data }: { data: ResultsType }) => {
  return (
    <>
      <VStack>
        <HStack alignX="left" alignY="center" gap="XXS">
          <Heading level={3}>{data.name}</Heading>
          <ArrowDown baseline />
        </HStack>
        <Box
            // @ts-ignore
            my="L"
        >
          <VStack gap="M">
            <InfoBlock>
              <Heading level={4} weight="weak">
                Account name
              </Heading>
              <span>{data.name}</span>
            </InfoBlock>
            <InfoBlock>
              <Heading level={4} weight="weak">
                Industry
              </Heading>
              <span>{data?.industry?.value}</span>
            </InfoBlock>
            <InfoBlock>
              <Heading level={4} weight="weak">
                Number of employees
              </Heading>
              <span>{data?.number_of_employees}</span>
            </InfoBlock>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

interface DetailsProps {
  isLoading: boolean;
  data?: ResultsType | null;
}

const Details: FC<DetailsProps> = ({ isLoading, data }) => {
  return <StyledContent>{isLoading || !data ? <Loader /> : <Content data={data} />}</StyledContent>;
};

export default Details;
