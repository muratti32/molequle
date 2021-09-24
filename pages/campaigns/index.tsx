import React, {useEffect} from 'react'
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Pagination } from "@pasha28198/molequle-web-common";
import { PeopleActions, PeopleContent, PeopleSidebar, PeopleView } from "../../views/Campaign";
import { Details, PaneAlignments } from "../../components/Details";

import { CampaignProvider, CampaignsResponse } from "../../api/campaigns.api";
import { useCampaigns } from "../../services/campaign/campaigns.hook";
import { parseAfterPromiseAll } from "../../util/helpers";
import styled from "@emotion/styled";
import {useRouter} from "next/router";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";

const Container = styled(Details.Container)`
  width: 100%;
`
const Content = styled(Details.Content)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default ({ initCampaigns }: { initCampaigns: CampaignsResponse }): React.ReactNode => {
  const { accounts, nextPage, page, setPage, fields } = useCampaigns(initCampaigns);
  const [searchVisible, setSearchVisible] = useState(false);
  const [hideSidebar, setHideSidebar] = useState<boolean>(true)
  const toggleSidebar = () => {
      setHideSidebar(prev => !prev)
  }

    const router = useRouter()

    useEffect(() => {
        if (router.query.page) {
            setPage(Number(router.query.page))
        }
    }, [])
    useEffect(() => {
        router.push(`${router.route}?page=${page}`, undefined, {shallow: true})
    }, [page])

  return (
    <PeopleView>
      <Details.LeftPane hide={hideSidebar}>
        <PeopleSidebar onSearchShow={() => setSearchVisible(true)} />
      </Details.LeftPane>
      <Container fullWidth={true} openSidebar={hideSidebar}>
        <Details.Header>
          {({ onAlignmentChange }) => (
            <PeopleActions
              onCategoriesToggle={() => onAlignmentChange(PaneAlignments.LEFT)}
              onSearchToggle={setSearchVisible}
              isSearchVisible={searchVisible}
              toggleSidebar={toggleSidebar}
              items={[]}
              label={'Campaigns'}
              dropdown={false}
            />
          )}
        </Details.Header>
        <Content>
          <PeopleContent columns={fields} data={accounts} />
          <Pagination nextStep={nextPage} initPage={page} onUpdate={setPage} />
        </Content>
      </Container>
    </PeopleView>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const props = parseAfterPromiseAll(await Promise.all([CampaignProvider.getCampaigns()]), [
            "initCampaigns",
        ]);
        console.log(props)
        // @ts-ignore
        return withPageAuthRequired({ props: JSON.parse(JSON.stringify(props)) })(context);
    } catch (e) {
        console.log('campaigns - ' + e)
        context.res.writeHead(302, { Location: "/" }).end();
    }
    //@ts-ignore
    return withPageAuthRequired({ props: {} })(context);
};
