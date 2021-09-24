import React, {useEffect} from 'react'
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Pagination } from "@pasha28198/molequle-web-common";
import { PeopleActions, PeopleContent, PeopleSidebar, PeopleView } from "../../views/Account";
import { Details, PaneAlignments } from "../../components/Details";
import { AccountProvider, AccountsResponse } from "../../api/account.api";
import { useAccounts } from "../../services/account/accounts.hook";
import { parseAfterPromiseAll } from "../../util/helpers";
import styled from "@emotion/styled";
import {useRouter} from "next/router";

const Container = styled(Details.Container)`
  width: 100%;
`
const Content = styled(Details.Content)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default ({ initAccounts }: { initAccounts: AccountsResponse }): React.ReactNode => {
  const { accounts, nextPage, page, setPage, fields } = useAccounts(initAccounts);
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
    router.push(`/account/${page === 1 ? '' : `?page=${page}`}`, undefined, {shallow: true})
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

export const getServerSideProps: GetServerSideProps = async () => {
  const props = parseAfterPromiseAll(await Promise.all([AccountProvider.fetchAccounts()]), [
    "initAccounts",
  ]);

  return { props };
};