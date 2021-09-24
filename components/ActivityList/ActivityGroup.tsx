import React, { useState } from "react";
import _ from "lodash";
import { Box, Flex } from "@pasha28198/molequle-web-common";
import ActivityDate from "./ActivityDate";
import ActivityItem from "./ActivityItem";
import ActivityItemHeader from "./ActivityItemHeader";

interface ActivityGroupProps {
  day: string;
  month: string;
  data: any;
  setActiveDate: any;
  activeDate: string;
  activeGroup: string;
  initActivity?: any;
}

const ActivityGroup = ({ day, month, data, setActiveDate, activeDate, initActivity, activeGroup }: ActivityGroupProps) => {
  const [expanded, setExpanded] = useState(false);

  // const chunkData = _.chunk(Object.keys(data), 3);

  console.log("halo ActivityGroup :",initActivity)

    return (
    <Flex
      direction={{ default: "column", tablet: "row" }}
      gap="XL"
      // @ts-ignore
      mb="M"
      textColor="textDark"
    >
      <Flex.Item size={{ default: "auto", tablet: "content" }}>
        <ActivityDate active={activeDate} day={day} month={month}/>
      </Flex.Item>
      <Flex.Item size="auto">
        <Box bg="ghostWhite" borderRadius="20px" onClick={() => setExpanded(!expanded)}>
          <Flex direction="column">
            {
              initActivity && (
                <ActivityItemHeader data={initActivity}/>
              )
            }
            {/*{expanded &&*/}
            {/*  chunkData.map((keys: Array<string>) => (*/}
            {/*    <ActivityItem key={keys?.toString()} keys={keys} data={data} />*/}
            {/*  ))}*/}
          </Flex>
        </Box>
      </Flex.Item>
    </Flex>
  );
};

export default React.memo(ActivityGroup);
