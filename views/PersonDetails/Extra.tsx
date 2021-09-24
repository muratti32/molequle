import React, { FC } from "react";
import { Dropdown, VStack, ListItem, Heading } from "@pasha28198/molequle-web-common";
import styled from "@emotion/styled";

import { useCampaign } from "../../services/campaign.hook";
import { CampaignsResults } from "../../api/campaigns.api";

export const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space.L};
  background: ${({ theme }) => theme.colors.purple};
  height: 100%;
  width: 100%;
`;

const CampaignBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid white;
  padding: 10px 0;
`;

const Content: React.FC = () => {
  const { campaignTypes, setCampaignType, campaign } = useCampaign();

  return (
    <StyledContent>
      <VStack gap="S">
        <h2>Campaigns</h2>
        <Dropdown label={<span>All types</span>} variant="inline">
          {campaignTypes?.map(({ id, value }: { [key: string]: string }) => (
            <ListItem key={id} onClick={() => setCampaignType(id)}>
              {value}
            </ListItem>
          ))}
        </Dropdown>
        {campaign &&
          campaign.map((camp: CampaignsResults) => {
            return (
              <div key={camp.id}>
                <CampaignBlock>
                  <Heading level={4}>Name</Heading>
                  <span>{camp.name}</span>
                  <Heading level={4}>Description</Heading>
                  <span>{camp.description}</span>
                </CampaignBlock>
              </div>
            );
          })}
      </VStack>
    </StyledContent>
  );
};

const Extra: FC = () => {
  return <Content />;
};

export default Extra;
