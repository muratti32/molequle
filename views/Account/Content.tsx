import React from "react";
import { Box, Flex, Hidden, Tab, Tabs } from "@pasha28198/molequle-web-common";
import List from "./List";
import { ResultsType } from "../../api/account.api";

interface ContentProps {
  columns: string[];
  data: ResultsType[];
}

const Content: React.FC<ContentProps> = ({ columns, data }) => {
  return (
    <Box
        // @ts-ignore
        mt="M"
        p={{ default: "NONE", tablet: "XL" }}
        w={'100%'}
    >
      <Flex
          direction={{ default: "column-reverse", tablet: "row" }}
          gap={{ default: "NONE", tablet: "M" }}
      >
        <List columns={columns} data={data} />
      </Flex>
    </Box>
  );
};

export default Content;
