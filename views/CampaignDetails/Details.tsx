import React, { FC } from "react";
import { ArrowDown, Box, Group, Heading, HStack, Line, Skeleton, VStack } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import { CampaignsResults } from "../../api/campaigns.api";

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
      </VStack>
    </>
  );
};


const Content = ({ data }: { data: CampaignsResults[] }) => {

  console.log(data)

  return (
    <>
      <VStack>
        <HStack alignX="left" alignY="center" gap="XXS">
          <Heading level={3}>{data[0].name}</Heading>
          <ArrowDown baseline />
        </HStack>
        <Box
            // @ts-ignore
            my="L"
        >
          <VStack gap="M">
            {data.map((data: any) => (
                <InfoBlock>
                  <Heading level={4} weight="weak">
                    {data.name}
                  </Heading>
                  <span>{data?.description}</span>
                </InfoBlock>
            ))}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

interface DetailsProps {
  isLoading: boolean;
  data?: CampaignsResults[] | null;
}

const Details: FC<DetailsProps> = ({ isLoading, data }) => {
  return <StyledContent>{isLoading || !data ? <Loader /> : <Content data={data} />}</StyledContent>;
};

export default Details;
