import React, {useEffect, useState} from "react";
import { GetServerSideProps } from "next";
import {Mail, Pagination, Star, Tab, Tabs} from "@pasha28198/molequle-web-common";

import { AccountProvider } from "../../api/account.api";
import {
  Engage,
  PersonActions,
  PersonActivities,
  AccountDetails,
  PersonDetailsView,
  AccountExtra,
} from "../../views";
import { Details } from "../../components";
import {
  ActivitiesProvider,
  ActivitiesResponse,
  GroupsOfActivitiesResultsType,
} from "../../api/activities.api";
import { useActivity } from "../../services/activities.hook";
import { objectToQuery, parseAfterPromiseAll } from "../../util/helpers";
import { useAccount } from "../../services/account/account.hook";
import styled from "@emotion/styled";
import Chart from "../../views/PersonDetails/Chart";
import {useRouter} from "next/router";

type AccountType = {
  initActivityGroup: GroupsOfActivitiesResultsType;
  initActivity: ActivitiesResponse;
  account_id: number;
};

const Container = styled(Details.Container)`
  width: 100%;
`
const Content = styled(Details.Content)`
  width: 100%;
`

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

export default ({ initActivityGroup, initActivity, account_id }: AccountType): JSX.Element => {
  const [engageVisible, setEngageVisible] = useState(false);
  const [hideSidebar, setHideSidebar] = useState<boolean>(true)
  const { account, people } = useAccount(account_id);
  const [activeGroup, setActiveGroup] = useState('Web')
  const {
    groups,
    changeTabGroup,
    activities,
      page,
      nextPage,
      setPage
  } = useActivity({
    initFilters: { account_id },
    initActivityGroup,
    initActivity,
  });
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
    router.push(`${router.asPath}${page === 1 ? '' : `?page=${page}`}`, undefined, {shallow: true})
  }, [page])

  const Label = ({ value }: { value: string, index: number }) => {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
          {
            value === 'Email' ? <Mail width={20} height={20} /> :
              value === 'Other' ? <Star width={20} height={20} /> :
                  value === 'Web' ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.16665 3.75H15.8333C16.9839 3.75 17.9166 4.68274 17.9166 5.83333V11.6667C17.9166 12.8173 16.9839 13.75 15.8333 13.75H4.16665C3.01605 13.75 2.08331 12.8173 2.08331 11.6667V5.83333C2.08331 4.68274 3.01605 3.75 4.16665 3.75ZM0.833313 5.83333C0.833313 3.99238 2.3257 2.5 4.16665 2.5H15.8333C17.6743 2.5 19.1666 3.99238 19.1666 5.83333V11.6667C19.1666 13.5076 17.6743 15 15.8333 15H10.625V16.875H13.3333C13.6785 16.875 13.9583 17.1548 13.9583 17.5C13.9583 17.8452 13.6785 18.125 13.3333 18.125H6.66665C6.32147 18.125 6.04165 17.8452 6.04165 17.5C6.04165 17.1548 6.32147 16.875 6.66665 16.875H9.37498V15H4.16665C2.3257 15 0.833313 13.5076 0.833313 11.6667V5.83333Z" fill="#2D3958"/>
                      </svg>
                      : null
          }
        <span style={{marginRight: '-3px'}}>{value}</span>
      </div>
    );
  };

  return (
    <PersonDetailsView>
      <Details.LeftPane hide={hideSidebar}>
        <AccountDetails data={account} isLoading={!account} />
      </Details.LeftPane>
      <Container fullWidth={true} fullHeight={true} openSidebar={hideSidebar}>
        <Details.Header>
          {({ onAlignmentChange }) => (
            <PersonActions
              changeGroup={setActiveGroup}
              groups={groups}
              onEngage={() => setEngageVisible(!engageVisible)}
              onPersonDetailsToggle={() => onAlignmentChange("left")}
              toggleSidebar={toggleSidebar}
            />
          )}
        </Details.Header>
        <Content>
          <Tabs onChange={changeTabGroup}>
            <Tab id="all" label="All" />
            {groups?.map(({ name, id }: { [key: string]: string }, index) => (
              <Tab key={id} id={id} label={<Label value={name} index={index} />} />
            ))}
          </Tabs>
            <Chart />
          <PersonActivities
            activities={activities}
            onEngage={() => setEngageVisible(!engageVisible)}
            activeGroup={activeGroup}
            initActivity={initActivityGroup}
          />
          <PaginationWrapper>
            {page !== 1 && nextPage ? <Pagination
                nextStep={nextPage}
                initPage={page}
                onUpdate={(newPage: number) => setPage(newPage)}
            />: null}
          </PaginationWrapper>
        </Content>
      </Container>
      <Details.RightPane>
        <AccountExtra people={people} />
      </Details.RightPane>
      <Engage
        isVisible={engageVisible}
        onClickOutside={() => engageVisible && setEngageVisible(false)}
      />
    </PersonDetailsView>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const account_id = Number(context.query.id);

  try {
    const props = parseAfterPromiseAll(
      await Promise.all([
        AccountProvider.fetchAccountById(account_id),
        ActivitiesProvider.getGroupsOfActivities().then((response) => response?.results),
        ActivitiesProvider.getActivities({
          query: objectToQuery({ account_id }),
        }),
      ]),
      ["account", "initActivityGroup", "initActivity"],
    );

    return { props: { account_id, ...props } };
  } catch (e) {
    console.log('account [id] - ' + e)
    context.res.writeHead(302, { Location: "/" }).end();
  }

  return { props: {} };
};
