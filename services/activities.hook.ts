import { useState } from "react";
import { ResultsType } from "../api/account.api";
import {
  ActivitiesProvider,
  GroupsOfActivitiesResultsType,
  ActivitiesResponse,
} from "../api/activities.api";
import { useFilters } from "./filters.hook";

interface Activity {
  initFilters: { account_id: number };
  initActivityGroup: any;
  initActivity: ActivitiesResponse;
}

export const useActivity = ({
  initFilters,
  initActivityGroup,
  initActivity,
}: Activity): {
  groups: { id: string; name: string }[];
  getTypesByIdGroup: { id: number; name: string; description: string; attributes: string[] }[];
  activities: any;
  page: string | number | boolean | undefined;
  nextPage: boolean;
  setCurrentGroupId: (numberTab: number) => void;
  setCurrentActivityType: (value: string | number) => void;
  setPage: (value: string | number) => void;
  changeTabGroup: (numberTab: number) => void;
} => {
  const [activities, updateActivities] = useState(initActivity);

  const { filters, updateFilters } = useFilters({
    init_filters: { page: 1, group_id: "", type_id: "", ...initFilters },
    filtersDidUpdate: ({ newFiltersQueryFormat }) => {
      // eslint-disable-next-line no-void
      void ActivitiesProvider.getActivities({
        query: newFiltersQueryFormat,
      }).then((response) => {
        updateActivities(response);
      });
    },
  });

  const groups = initActivityGroup?.map(({ id, name }: { id: string; name: string }) => ({
    id,
    name,
  }));

  const getTypesByIdGroup = filters.group_id
    ? initActivityGroup?.filter((item:GroupsOfActivitiesResultsType) => item?.id === filters.group_id)[0]?.types
    : initActivityGroup?.reduce(
        /* eslint-disable-next-line */
        (prev: Array<any>, current: any) => [...current?.types, ...prev],
        [],
      );

  return {
    groups,
    getTypesByIdGroup,
    activities: activities?.results,
    page: filters?.page,
    nextPage: !activities?.next,
    setCurrentGroupId: (numberTab: number) =>
      updateFilters("group_id", numberTab ? groups[numberTab - 1]?.id : ""),
    setCurrentActivityType: (value: string | number) => updateFilters("type_id", value || ""),
    setPage: (value: string | number) => updateFilters("page", value),
    changeTabGroup: (numberTab: number) =>
      updateFilters("group_id", numberTab ? groups[numberTab - 1]?.id : ""),
  };
};

export type ActivityProps = {
  type_id: string;
  person_id: string;
  group_id: string;
};
