import React, {useState} from "react";
import {Add, Box, Button, Flex, Hidden, Tab, Tabs} from "@pasha28198/molequle-web-common";
import List from "./List";
import { CampaignsResults } from "../../api/campaigns.api";
import styled from "@emotion/styled";

interface ContentProps {
  columns: string[];
  data: CampaignsResults[];
}

const EngageButton = styled(Button)`
  ${({ theme }) => theme.media.greaterThan("tablet")`
     display: none;
  `}
  position: absolute;
  right: 18px;
  bottom: 18px;
`

const EngageIcon = styled(Add)`
  width: 20px;
  height: 20px;
  svg {
    path {
      fill: #ffffff;
    }
  } 
`

const Content: React.FC<ContentProps> = ({ columns, data }) => {

  const [toggleButton, setToggleButton] = useState<boolean>(false)

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
      <EngageButton onClick={() => setToggleButton(prev => !prev)}>{toggleButton && 'Engage '}<EngageIcon/></EngageButton>
    </Box>
  );
};

export default Content;
