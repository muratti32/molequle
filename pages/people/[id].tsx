import React, {useEffect, useState} from "react";
import { GetServerSideProps } from "next";
import { Pagination, Star, Tab, Tabs } from "@pasha28198/molequle-web-common";
import dynamic from "next/dynamic";
import {
  Engage,
  PersonActions,
  PersonActivities,
  PersonDetails,
  PersonDetailsView,
  PersonExtra,
  PersonFilters,
} from "../../views";
import { Details } from "../../components";
import {
  ActivitiesProvider,
  ActivitiesResponse,
  GroupsOfActivitiesResultsType,
} from "../../api/activities.api";
import { PeopleProvider } from "../../api/people.api";
import { useActivity } from "../../services/activities.hook";
import { objectToQuery, parseAfterPromiseAll } from "../../util/helpers";
import { Person, PeopleFieldsResponse } from "../../lib/persons";
import {useRouter} from "next/router";
import styled from "@emotion/styled";

const ActivityChart = dynamic(
  () => {
    return import("../../views/PersonDetails/ActivityChart");
  },
  { ssr: false },
);

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

interface PersonPropsType {
  user: Person;
  initActivityGroup: GroupsOfActivitiesResultsType;
  initActivity: ActivitiesResponse;
  person_id: number;
}
export default ({
  user,
  initActivityGroup,
  initActivity,
  person_id,
}: PersonPropsType): React.ReactNode => {

  const [engageVisible, setEngageVisible] = useState(false);
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [activeGroup, setActiveGroup] = useState('Web')
  const {
    groups,
    changeTabGroup,
    getTypesByIdGroup,
    setCurrentActivityType,
    activities,
    page,
    nextPage,
    setPage,
  } = useActivity({
    initFilters: { account_id: person_id },
    initActivityGroup,
    initActivity,
  });

  const Label = ({ value }: { value: string }) => {
    return (
      <>
        <Star width={24} height={24} />
        <span>{value}</span>
      </>
    );
  };

 

  return (
    <PersonDetailsView>
      <Details.LeftPane hide={sidebar}>
        <PersonDetails data={user} isLoading={!user} />
      </Details.LeftPane>
      <Details.Container fullWidth={true} fullHeight={true} openSidebar={() => setSidebar(prev => !prev)}>
        <Details.Header>
          {({ onAlignmentChange }) => (
            <PersonActions
              toggleSidebar={() => setSidebar(prev => !prev)}
              changeGroup={() => {}}
              groups={[]}
              onEngage={() => setEngageVisible(!engageVisible)}
              onPersonDetailsToggle={() => onAlignmentChange("left")}
            />
          )}
        </Details.Header>
        <Details.Content>
          <Tabs onChange={changeTabGroup}>
            <Tab id="all" label="All" />
            {groups?.map(({ value, id }: { [key: string]: string }) => (
              <Tab key={id} id={id} label={<Label value={value} />} />
            ))}
          </Tabs>
          {/* <PersonActivityChart /> */}
          <ActivityChart />
          <PersonFilters types={getTypesByIdGroup} changeType={setCurrentActivityType} />
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
        </Details.Content>
      </Details.Container>
      <Details.RightPane>
        <PersonExtra />
      </Details.RightPane>
      <Engage
        isVisible={engageVisible}
        onClickOutside={() => engageVisible && setEngageVisible(false)}
      />
    </PersonDetailsView>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const person_id = Number(context.query.id);

  try {
    const props = parseAfterPromiseAll(
      await Promise.all([
        PeopleProvider.fetchPerson(person_id),
        ActivitiesProvider.getGroupsOfActivities().then((response) => response?.results),
        ActivitiesProvider.getActivities({
          query: objectToQuery({ person_id }),
        }),
      ]),
      ["user", "initActivityGroup", "initActivity"],
    );

    return { props: JSON.parse(JSON.stringify({ person_id, ...props })) };
  } catch (e) {
    console.log('people [id] - ' + e)
    context.res.writeHead(302, { Location: "/" }).end();
  }

  return { props: {} };
};
