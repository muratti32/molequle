import { useState } from "react";
import { objectToQuery } from "../util/helpers";

type FiltersDidUpdateTypes = {
  newFilters: { [key: string]: string | number | boolean | undefined };
  prevFilters: { [key: string]: string | number | boolean | undefined };
  newFiltersQueryFormat: string;
};

type FiltersTypes = {
  init_filters: { [key: string]: string | number | boolean | undefined };
  filtersDidUpdate: ({
    newFilters,
    prevFilters,
    newFiltersQueryFormat,
  }: FiltersDidUpdateTypes) => void;
};

export const useFilters = ({ init_filters, filtersDidUpdate }: FiltersTypes):{
  filters: {
      [key: string]: string | number | boolean | undefined;
  };
  filtersQueryFormat: string;
  updateFilters: (filter: string, value: string | number | boolean | undefined) => void;
} => {
  const [filters, updateFilters] = useState<any>(init_filters);

  return {
    filters,
    filtersQueryFormat: objectToQuery(filters),
    updateFilters: (filter: string, value: string | number | boolean | undefined) => {
      const newFilters = { ...filters };
      newFilters[filter] = value;
      updateFilters(newFilters);
      filtersDidUpdate({
        newFilters,
        prevFilters: filters,
        newFiltersQueryFormat: objectToQuery(newFilters),
      });
    },
  };
};
