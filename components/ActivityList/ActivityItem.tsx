import React from "react";
import { Flex, Group, Line, Skeleton, Tooltip } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";

const Container = styled.div`
  padding: ${({ theme }) => `${theme.space.XS} ${theme.space.M}`};

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.gainsboro};
  }
`;

const Placeholder = () => (
  <Container>
    <Flex>
      <Skeleton>
        <Group>
          <Line width={0.3} dimmed />
          <Line width={0.9} dimmed={1 / 4} />
        </Group>
      </Skeleton>
    </Flex>
  </Container>
);

const ActivityItem = ({ data, keys }: { data: { [key: string]: string }; keys: string[] }) => {
  if (!data) return <Placeholder />;

  return (
    <Container>
      <Flex>
        {keys.map((item: string) => (
          <Flex.Item size={0.3}>
            <Group>
              <h3>{item}</h3>
              <Tooltip content={data[item]}>
                <p>{data[item].slice(0, 30)}...</p>
              </Tooltip>
            </Group>
          </Flex.Item>
        ))}
      </Flex>
    </Container>
  );
};

export default React.memo(ActivityItem);
