import { useState } from "react";

import { PeopleProvider } from "../../api/people.api";

export const usePeople = ():{
  page: number;
  updateFilter: any;
  setPage: (targetPage: number) => void;
  people: any;
  nextPage:  boolean
} => {
  const [filters, setFilters] = useState({ filter: {}, page: 1 });
  const [userData, setUserData] = useState<{ [key: string]: string | number | boolean }>({});

  const doSearch = (body:  {
    [key: string]: string | number | boolean;
}, page: number) => {
    // eslint-disable-next-line no-void
    void PeopleProvider.searchPeople({
      body,
      page,
    }).then(async (res) => {
      const data = await res.json();
      setUserData(data.response);
    });
  };

  return {
    page: filters.page,
    people: userData?.results || [],
    nextPage: !userData?.next,
    updateFilter: (filterBody:any) => {
      setFilters({
        page: 1,
        filter: filterBody,
      });

      doSearch(filterBody, 1);
    },

    setPage: (targetPage: number) => {
      const { filter, page } = filters;
      setFilters({
        filter,
        page: targetPage || page + 1,
      });

      doSearch(filter, page + 1);
    },
  };
};
