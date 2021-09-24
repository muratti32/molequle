import React, {FC, useCallback, useContext, useMemo} from "react";
import {
  Box, Columns, Dropdown,
  Flex, QueryBuilder,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHead,
  TableRow,
  usePinTableColumn,
} from "@pasha28198/molequle-web-common";

import Link from "next/link";
import { CampaignsResults } from "../../api/campaigns.api";
import styled from "@emotion/styled";
import {isComparable} from "../../lib/fields";
import {FilterContext} from "../../services/people/filter.context";
import ColumnSelector from "../People/ColumnSelector";

interface ListType {
  columns: string[];
  data: CampaignsResults[];
}

const FlexBlock = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`
const Label = () => {
  return (
      <>
        <Columns width="1.75em" height="1.75em" aria-hidden />
      </>
  );
};
const List: FC<ListType> = ({ columns, data }) => {
  const { sortedColumns, onPin, pinnedColumn } = usePinTableColumn(columns);
  const { updateFilter, entities } = useContext(FilterContext);

  const formatCell = useCallback((value?: string | number | boolean | null) => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (value === null || value === undefined) {
      return "N.A.";
    }

    return value;
  }, []);

  return (
    <Flex.Item size="auto">
      <Box p="M">
        {/*<FlexBlock>*/}
        {/*  <Flex.Item>*/}
        {/*    <Dropdown variant="inline" label={<Label />} corner="right">*/}
        {/*      <ColumnSelector*/}
        {/*          items={entities.map(*/}
        {/*              (e: { key: string; fields: { name: string; label: string }[] }) => ({*/}
        {/*                label: e.key,*/}
        {/*                items: e.fields.map((f: { name: string; label: string }) => ({*/}
        {/*                  value: f.name,*/}
        {/*                  label: f.label,*/}
        {/*                })),*/}
        {/*              }),*/}
        {/*          )}*/}
        {/*      />*/}
        {/*    </Dropdown>*/}
        {/*  </Flex.Item>*/}
        {/*</FlexBlock>*/}
        <Table isFirstColumnPinned={!!pinnedColumn}>
          <TableHead>
            {columns.map((col: string) => (
              <TableColumn field={col} title={col} key={col} onPin={onPin} />
            ))}
          </TableHead>
          <TableBody>
            {data?.map((record: any) => (
              <TableRow key={record.id}>
                {sortedColumns.map((field: any) => {
                  const fieldValue = record[field];
                  return (
                    <TableCell key={`${field}`}>
                      {field === "id" ? (
                        <Link href="/campaigns/[id]" as={`/campaigns/${fieldValue}`}>
                          <a>{formatCell(fieldValue)}</a>
                        </Link>
                      ) : (
                        formatCell(fieldValue)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Flex.Item>
  );
};

export default List;
