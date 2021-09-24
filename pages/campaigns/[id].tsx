import React, {useState} from "react";
import { GetServerSideProps } from "next";
import { Pagination } from "@pasha28198/molequle-web-common";
import { CampaignDetails } from "../../views";
import {Details, PaneAlignments} from "../../components";
import { PeopleProvider } from "../../api/people.api";
import { objectToQuery, parseAfterPromiseAll } from "../../util/helpers";
import { useCampaign } from "../../services/campaign/campaign.hook";
import {PeopleActions, PeopleContent, PeopleView} from "../../views/Campaign";
import { RawPerson } from "../../lib/persons";
import { CampaignsResponse } from "../../api/campaigns.api";
import styled from "@emotion/styled";

interface InitPeople {
  next: string | null;
  previous: string | null;
  results: RawPerson[];
}

type CampaignType = {
  initPeople: CampaignsResponse;
  campaign_id: number;
};

const Container = styled(Details.Container)`
  width: 100%;
`
const Content = styled(Details.Content)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const items = [
  'Campaign Members',
  'Campaign Members 1',
  'Campaign Members 2',
]

export default ({ initPeople, campaign_id }: CampaignType): React.ReactNode => {
  const { page, updatePage, people, campaign, next, columns } = useCampaign(
    campaign_id,
    initPeople,
  );

  const [searchVisible, setSearchVisible] = useState<boolean>(false)
  const [hideSidebar, setHideSidebar] = useState<boolean>(true)

  const toggleSidebar = () => {
    setHideSidebar(prev => !prev)
  }

  return (
    <PeopleView>
      <Details.LeftPane hide={hideSidebar}>
        {/*<CampaignDetails data={campaign} isLoading={false} />*/}
      </Details.LeftPane>
      <Container fullWidth={true} openSidebar={hideSidebar}>
        <Details.Header>
          {({ onAlignmentChange }) => (
              <PeopleActions
                  onCategoriesToggle={() => onAlignmentChange(PaneAlignments.LEFT)}
                  onSearchToggle={setSearchVisible}
                  isSearchVisible={searchVisible}
                  toggleSidebar={toggleSidebar}
                  button={true}
                  items={items}
              />
          )}
        </Details.Header>
        <Content>
          <PeopleContent columns={columns} data={people} />
          <Pagination nextStep={next} initPage={page} onUpdate={updatePage} />
        </Content>
      </Container>
    </PeopleView>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campaign_id = Number(context.query.id);

  try {
    const props = parseAfterPromiseAll(
      await Promise.all([PeopleProvider.getPeople(objectToQuery({ campaign_id }))]),
      ["initPeople"],
    );

    return { props: { campaign_id, ...props } };
  } catch (e) {
    console.log('campaigns [id] - ' + e)
    context.res.writeHead(302, { Location: "/" }).end();
  }

  return { props: {} };
};
