import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { PeopleActions, PeopleContent, PeopleSidebar, PeopleView } from '../../views/People';
import { Details, PaneAlignments } from '../../components/Details';
import { fetchPersonFields, RawPeopleListResponse } from '../../lib/persons';
import { useEntities } from '../../services/people/entities.hook';
import { fetchAccountFields } from '../../lib/accounts';
import { FilterContext } from '../../services/people/filter.context';
import { parseAfterPromiseAll } from '../../util/helpers';
import { getAccessToken, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import useApi from '../../lib/use-api';

const People: NextPage = () => {
  const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);
  const [hideSidebar, setHideSidebar] = useState<boolean>(true);
  const { user, error, isLoading } = useUser();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ filter: {}, page: 1 });
  const [
    { response: peopleViews, error: peopleViewsError, isLoading: peopleViewsLoading },
    setPeopleViews,
  ] = useApi('/api/people/views/get-views', '', 'get');
  const [{ response: peopleFields, error: peopleFieldError, isLoading: peopleFieldLoading }] =
    useApi('/api/people/schema', '', 'get');
  const [{ response: accountsFields, error: accountsFieldError, isLoading: accountsFieldLoading }] =
    useApi('/api/accounts/schema', '', 'get');
  // const {
  //   response: people,
  //   error: peopleError,
  //   isLoading: peopleLoading,
  // } = useApi(`/api/people`, router.query.page ? `?page=${router.query.page as string}` : '', 'get');
  const [{ response: search, error: searchError, isLoading: searchLoading }] = useApi(
    `/api/people/search`,
    filters.page === 1 ? '' : `?page=${filters.page as unknown as string}`,
    'post',
    filters.filter,
  );

  const updateFilter = (filterBody: any) => {
    setFilters({
      page: 1,
      filter: filterBody,
    });
  };

  const toggleSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (router.query.page) {
      setFilters({ ...filters, page: Number(router.query.page) });
    }
  }, []);

  useEffect(() => {
    router.push(`${router.route}${filters.page === 1 ? '' : `?page=${filters.page}`}`, undefined);
  }, [filters]);

  const { entities, fields } = useEntities({
    personFieldsPrefetched: peopleFields,
    accountFieldsPrefetched: accountsFields,
  });

  const onRemove = async (e: any, id: number) => {
    // e.preventDefault();
    let params: RequestInit = {
      method: 'delete',
    };

    setFilters({
      page: 1,
      filter: {},
    });
    try {
      const res = await fetch(`/api/people/views/${id}`, params);
      const newViews = peopleViews.results.filter((v) => v.id !== id);
      const newResponse = { ...peopleViews, results: newViews };
      setPeopleViews((prev: any) => {
        return { ...prev, response: newResponse };
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (
    isLoading ||
    peopleFieldLoading ||
    accountsFieldLoading ||
    searchLoading ||
    peopleViewsLoading
  )
    return null;

  return (
    <FilterContext.Provider
      value={{
        filters,
        people: search.results,
        views: peopleViews,
        setViews: setPeopleViews,
        updateFilter,
        fields,
        entities,
        user,
        // peopleFilter: user?.access?.people_filter || null,
      }}
    >
      <PeopleView>
        <Details.LeftPane hide={hideSidebar}>
          <PeopleSidebar
            updateFilter={updateFilter}
            onRemove={onRemove}
            onSearchShow={() => {
              setSearchVisible((prev) => !prev);
              toggleSidebar();
            }}
          />
        </Details.LeftPane>
        <Details.Container openSidebar={hideSidebar} flex={false} fullHeight={true}>
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
          <Details.Content>
            <PeopleContent
              columns={fields}
              data={search.results}
              latestActivities={[]}
              nextPage={search.next}
              page={page}
              setFilters={setFilters}
            />
          </Details.Content>
        </Details.Container>
      </PeopleView>
    </FilterContext.Provider>
  );
};

export default People;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    let props;
    try {
      // TODO remove hardcoded {id} block
      props = parseAfterPromiseAll(await Promise.all([fetchPersonFields(), fetchAccountFields()]), [
        'personFieldsPrefetched',
        'accountFieldsPrefetched',
      ]);
      const { accessToken } = await getAccessToken(context.req, context.res);

      // @ts-ignore
      return { props: JSON.parse(JSON.stringify(props)) };
    } catch (e) {
      console.log('people - ' + e);
      context.res.writeHead(302, { Location: '/' }).end();
    }
    // @ts-ignore
    return { props: {} };
  },
});

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     // TODO remove hardcoded {id} block
//     const props = parseAfterPromiseAll(await Promise.all([fetchPersonFields(), fetchAccountFields()]), [
//       'personFieldsPrefetched',
//       'accountFieldsPrefetched',
//     ]);
//     const { accessToken } = await getAccessToken(context.req, context.res);
//     console.log(accessToken);
//     // console.log(props);
//     // @ts-ignore
//     return withPageAuthRequired({ props: JSON.parse(JSON.stringify(props)) })(context);
//   } catch (e) {
//     console.log('people - ' + e);
//     context.res.writeHead(302, { Location: '/' }).end();
//   }
//   // @ts-ignore
//   return withPageAuthRequired({ props: {} })(context);
// };
