import React from "react";
import { Button, Group, Line, Skeleton, VStack } from "@pasha28198/molequle-web-common";

interface WorkflowInterface {
    engageWorkflows: any;
}

const WorkflowDetails: React.FC<WorkflowInterface> = ({engageWorkflows}) => {
  return (
    <VStack h={1} bg="white" >
      <Skeleton>
        <Group>
          <Line width={0.4} />
        </Group>
        <Group>
          <Line width={1} dimmed />
          <Line width={0.7} dimmed />
          <Line width={0.9} dimmed />
          <Line width={0.8} dimmed />
        </Group>
      </Skeleton>
      <Button>Run Workflow</Button>
    </VStack>
  );
};

export default WorkflowDetails;
