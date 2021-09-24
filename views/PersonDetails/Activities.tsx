import React, { useState, FC } from "react";
import { Box, Button, Connection } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";
import { Flipped, Flipper } from "react-flip-toolkit";
import { ActivityList } from "../../components/ActivityList";
import { useScrollContext } from "../../components/ScrollProvider";

const EngageTriggerContainer = styled.div<{ isExpanded: boolean }>`
  position: fixed;
  top: 90%;
  right: 2vw;
  background: ${({ theme }) => theme.colors.pink};
  border-radius: 50%;

  & ${Button} {
    border-radius: ${({ isExpanded }) => (isExpanded ? undefined : "50%")};
    width: ${({ isExpanded }) => (isExpanded ? "124px" : "48px")};
    height: ${({ isExpanded }) => (isExpanded ? undefined : "48px")};
  }

  ${({ theme }) => theme.media.greaterThan("tablet")`
    display: none;
  `}
`;


interface ActivitiesProps {
  onEngage: () => void;
  activities: any;
  activeGroup: string;
  initActivity: any;
}

const Activities: FC<ActivitiesProps> = ({ onEngage, activities, activeGroup, initActivity }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  useScrollContext({
    onScrollChange: (scrollDirection) => {
      if (scrollDirection === "DOWN") {
        setTimeout(() => {
          setIsExpanded(false);
        }, 100);
      } else if (scrollDirection === "UP") {
        setIsExpanded(true);
      }
    },
  });

  return (
    <Box
        // @ts-ignore
        mt="M"
        p={{ default: "M", tablet: "L" }}
    >
      <ActivityList activities={activities} activeGroup={activeGroup} initActivity={initActivity}/>
      
      <Flipper flipKey={isExpanded}>
        <Flipped flipId="engage-trigger">
          {(flipperProps) => (
            <EngageTriggerContainer isExpanded={isExpanded} {...flipperProps}>
              <Button onClick={onEngage}>
                <Flipped inverseFlipId="engage-trigger">
                  {isExpanded ? <span>Engage</span> : <Connection height="18" width="18" />}
                </Flipped>
              </Button>
            </EngageTriggerContainer>
          )}
        </Flipped>
      </Flipper>
    </Box>
  );
};

export default Activities;
