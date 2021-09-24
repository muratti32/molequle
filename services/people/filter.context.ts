import React from 'react';

export const FilterContext = React.createContext<any>({
  people: null,
  fields: null,
  entities: null,
  // peopleFilter: null,
  user: null,
  filters: null,
  updateFilter: () => {},
});
