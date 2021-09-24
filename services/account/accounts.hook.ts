import { useState } from "react";
import { useFilters } from "../../services/filters.hook";
import { AccountProvider, AccountsResponse, ResultsType } from "../../api/account.api";

export const useAccounts = (initAccounts: AccountsResponse):{
  page: string | number | boolean | undefined;
  setPage: (newPage: number) => void;
  accounts: ResultsType[];
  nextPage: boolean;
  fields: string[];
} => {
  const [accounts, setAccounts] = useState(initAccounts);

  const { filters, updateFilters } = useFilters({
    init_filters: {
      page: 1,
    },
    filtersDidUpdate: ({ newFiltersQueryFormat }) => {
      AccountProvider
        .fetchAccounts(newFiltersQueryFormat)
        .then((res) => {
          setAccounts(res);
      }).catch(()=>{});
    },
  });

  return {
    page: filters.page,
    setPage: (newPage: number) => updateFilters("page", newPage),
    accounts: accounts?.results || [],
    nextPage: !accounts?.next,
    fields: ["id", "name", "number_of_employees"],
  };
};
