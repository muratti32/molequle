import React from "react";
import { Box, Flex } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";

interface ActivityDateProps {
  day: string;
  month: string;
  active: string;
}

const Day = styled.strong`
  font-size: 20px;
  color: #2D3958;
`

const Month = styled.strong`
  font-size: 12px;
  color: #2D3958;
`

const ActivityDate = ({ day, month, active }: ActivityDateProps) => {
  return (
    <Box>
      <Flex
        direction={{ default: "row", tablet: "column" }}
        gap={{ default: "XXS", tablet: "NONE" }}
      >
        <Flex.Item>
          <Day>{day}</Day>
        </Flex.Item>
        <Flex.Item>
          <Month>{month}</Month>
        </Flex.Item>
      </Flex>
    </Box>
  );
};

export default React.memo(ActivityDate);
