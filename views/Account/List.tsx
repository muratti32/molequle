import React, { useCallback } from "react";
import {
  Box,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHead,
  TableRow,
  usePinTableColumn,
} from "@pasha28198/molequle-web-common";

import Link from "next/link";
import { ResultsType } from "../../api/account.api";

interface ListType {
  columns: string[];
  data: ResultsType[];
}

const List = ({ columns, data }: ListType): JSX.Element => {
  const { sortedColumns, onPin, pinnedColumn } = usePinTableColumn(columns);

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
        <Table isFirstColumnPinned={!!pinnedColumn}>
          <TableHead>
            {columns.map((col: string) => (
              <TableColumn field={col} title={col} key={col} onPin={onPin} />
            ))}
          </TableHead>
          <TableBody>
            {data.map((record: any) => (
              <TableRow key={record.id}>
                {sortedColumns.map((field: string) => {
                  const fieldValue = record[field];
                  return (
                    <TableCell key={`${record.id}-${fieldValue}`}>
                      {field === "id" ? (
                        <Link href="/account/[id]" as={`/account/${fieldValue}`}>
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
