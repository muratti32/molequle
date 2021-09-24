import React, { FC, useCallback, useMemo, useState, useContext } from 'react';
import {
  Box,
  Columns,
  Dropdown,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHead,
  TableRow,
  usePinTableColumn,
} from '@pasha28198/molequle-web-common';
import { QueryBuilder } from '../../components';
import { hideVisually } from 'polished';
import Link from 'next/link';
import { isComparable } from '../../lib/fields';
import ColumnSelector from './ColumnSelector';
import { FilterContext } from '../../services/people/filter.context';
import styled from '@emotion/styled';

const get = (obj: Record<string, unknown>, path: string) => {
  const fields = path.split('.');
  let res: Record<string, unknown> | unknown = obj;
  fields?.forEach((f) => {
    res = (res as Record<string, unknown>)?.[f];
  });

  return res as string | number | boolean | null | undefined;
};

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${({ theme }) => theme.media.lessThan('fullhd')`
   width: 100%;
  `};
`;

const FlexBlock = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;

const initialColumns = ['person.first_name', 'person.last_name', 'person.email'];

const List: FC = () => {
  const { updateFilter, people: data, fields: columns, entities } = useContext(FilterContext);
  const [modifiedColumns, setModifiedColumns] = useState<any>(
    columns.filter((c: any) => initialColumns.includes(c.name)),
  );
  const { sortedColumns, onPin, pinnedColumn } = usePinTableColumn(modifiedColumns);
  const queryBuilderFields = useMemo(
    () =>
      columns?.map((col: { name: string; label: string; type: string }) => ({
        value: col.name.split('.')[1],
        label: col.label || col.name,
        isComparable: isComparable(col.type),
        type: col.type,
      })),
    [columns],
  );

  const formatCell = useCallback((value?: string | number | boolean | null) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (value === null || value === undefined) {
      return 'N.A.';
    }

    return value;
  }, []);

  const Label = () => {
    return (
      <>
        <Columns width='1.75em' height='1.75em' aria-hidden />
      </>
    );
  };
  return (
    <FlexWrapper>
      <Box p='M' w='100%'>
        <FlexBlock>
          <Flex.Item key='query-builder-flex'>
            <QueryBuilder
              fields={queryBuilderFields}
              onUpdate={updateFilter}
              sortedColumns={sortedColumns}
            />
          </Flex.Item>
          <Flex.Item key='column-selector-flex'>
            <Dropdown variant='inline' label={<Label />} corner='right'>
              <ColumnSelector
                visibleColumns={sortedColumns.map((c) => c.name)}
                items={entities}
                onChange={(selectedCols) => {
                  setModifiedColumns(
                    columns.filter((col: { name: string }) => selectedCols.includes(col.name)),
                  );
                }}
              />
            </Dropdown>
          </Flex.Item>
        </FlexBlock>
        <Table isFirstColumnPinned={!!pinnedColumn}>
          <TableHead>
            {sortedColumns.map((col: any) => {
              return (
                <TableColumn
                  field={col.name}
                  title={col.label || col.name}
                  key={col.name}
                  onPin={onPin}
                />
              );
            })}
          </TableHead>
          <TableBody>
            {data.map((record: { id: number }) => (
              <TableRow key={record.id}>
                {sortedColumns.map((field: any) => {
                  const normalizedField = field.name.replace('person.', '');
                  const fieldValue = get(record, normalizedField);

                  return (
                    /**
                     * Temporarily linked to access person detail page
                     */
                    <TableCell key={`${record.id}-${field.name}`}>
                      {field.name === 'person.first_name' 
                                  || field.name === 'person.last_name'
                                  || field.name === 'person.email' ?  (
                        <Link href='/people/[id]' as={`/people/${record.id}`}>
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
    </FlexWrapper>
  );
};

export default List;
