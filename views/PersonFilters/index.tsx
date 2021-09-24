import React, { FC } from "react";
import { Box, Dropdown, ListItem } from "@pasha28198/molequle-web-common";

interface PersonFiltersType {
  types: any;
  changeType: (id: string | number) => void;
}

interface Types {
  [key: string]: string | number;
}

export const PersonFilters: FC<PersonFiltersType> = ({ types, changeType }) => {
  return (
    <Box
        // @ts-ignore
        mt="M"
        p={{ default: "M", tablet: "L" }}
    >
      <Dropdown label={<h3>Types</h3>} variant="inline">
        <ListItem onClick={() => changeType("")}>All</ListItem>
        {types?.map(({ id, name }: { [key: string]: string | number }) => (
          <ListItem key={id} onClick={() => changeType(id)}>
            {name}
          </ListItem>
        ))}
      </Dropdown>
    </Box>
  );
};
