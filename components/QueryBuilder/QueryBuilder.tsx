/* eslint-disable react/no-array-index-key */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { RuleBox } from './RuleBox';
import RuleEditor from './RuleEditor';
import { FieldsProvider } from './FieldsProvider';
import { serializeQuery } from './QueryModel';
import Join from './Join';
import { Box, Button, Dropdown, Flex, TextInput } from '@pasha28198/molequle-web-common';
import { FlexItem } from '../Layout/Layout';
import { FilterContext } from '../../services/people/filter.context';

export const AddRuleButton = styled(Button)`
  padding: 0 !important;
  background: transparent;
  color: ${({ theme }) => theme.colors.pink};

  &:disabled {
    opacity: 0.5;
  }
`;

interface Rule {
  conditions: any;
  logicalOperator: 'and' | 'or';
}

interface QueryBuilderProps {
  fields: Array<{ value: string | number; label: string; isComparable: boolean; type: string }>;
  onUpdate: (data: any) => void;
  sortedColumns: any;
}

const QueryBuilder = ({ fields, onUpdate, sortedColumns }: QueryBuilderProps) => {
  const { filters, views, setViews } = useContext(FilterContext);
  const [segmentName, setSegmentName] = useState('');
  const [newRuleExpanded, setNewRuleExpanded] = useState(false);
  const [saveSegmentExpanded, setSaveSegmentExpanded] = useState(false);
  const [joinType, setJoinType] = useState<any>(Object.keys(filters.filter)[0] || 'and');
  // const [rules, setRules] = useState<{ [key: string]: QueryType }>(
  //   Object.keys(filters.filter)[0]
  //     ? filters.filter[Object.keys(filters.filter)[0]].map(
  //         (f: { [s: string]: unknown } | ArrayLike<unknown>) => {
  //           return {
  //             [Date.now()]: {
  //               logicalOperator: 'and',
  //               conditions: {
  //                 rule: Object.keys(f)[0],
  //                 field: Object.keys(Object.values(f)[0] as object)[0],
  //                 value: Object.values(Object.values(f)[0] as object)[0],
  //               },
  //             },
  //           };
  //         },
  //       )
  //     : {},
  // );
  const [rules, setRules] = useState<{ [key: string]: QueryType }>({});

  // useEffect(() => {
  //   if (Object.keys(filters.filter)[0]) {
  //     setRules(
  //       filters.filter[Object.keys(filters.filter)[0]].map(
  //         (f: { [s: string]: unknown } | ArrayLike<unknown>) => {
  //           return {
  //             [Date.now()]: {
  //               logicalOperator: 'and',
  //               conditions: {
  //                 rule: Object.keys(f)[0],
  //                 field: Object.keys(Object.values(f)[0] as object)[0],
  //                 value: Object.values(Object.values(f)[0] as object)[0],
  //               },
  //             },
  //           };
  //         },
  //       ),
  //     );
  //   }
  // }, [filters]);

  useEffect(() => {
    if (Object.keys(rules).length > 0) {
      onUpdate({ [joinType]: serializeQuery(rules) });
    } else {
      onUpdate({});
    }
  }, [rules]);

  const onJoinChange = useCallback(() => {
    setJoinType((state) => (state === 'and' ? 'or' : 'and'));
  }, []);

  const onFilterEdit = (data: any, id: number) => {
    const newState = { ...rules };
    newState[id].conditions = [data];
    setRules(newState);
  };

  const onFilterDelete = (id: string) => {
    const newState = { ...rules };
    delete newState[id];
    setRules(newState);
  };

  const addCondition = (condition: ConditionQueryType, id?: string) => {
    setRules({
      ...rules,
      [id || Date.now()]: {
        conditions: id ? [...rules[id].conditions, condition] : [condition],
        logicOperator: 'and',
      },
    });
  };

  const createFilter = (rule: any, isValid: boolean) => {
    setNewRuleExpanded(false);
    addCondition({ ...rule, error: !isValid });
  };

  const saveSegment = async (e) => {
    e.preventDefault();
    const columns = sortedColumns.map((c) => c.name);
    let params: RequestInit = {
      method: 'post',
      body: JSON.stringify({
        name: segmentName,
        filter: filters.filter,
        columns: columns,
        ordering: columns,
      }),
    };

    try {
      const res = await fetch('/api/people/views/', params);
      const result = await res.json();

      const newViews = [...views.results, result];
      const newResponse = { ...views, results: newViews };
      setViews((prev: any) => {
        return { ...prev, response: newResponse };
      });

      // setViews((prev: any) => {
      //   return { ...prev, response: newViews };
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FieldsProvider fields={fields}>
      <Flex gap={{ default: 'S', tablet: 'M' }} alignY='center' textColor='textDark' wrap>
        {Object.keys(rules).map((key, idx) => {
          const itemKey = `${joinType}-${key}-${idx}`;
          return (
            <>
              <Flex.Item key={itemKey}>
                <RuleBox
                  key={key}
                  conditions={rules[key].conditions}
                  onFilterEdit={onFilterEdit}
                  onFilterDelete={onFilterDelete}
                  onJoinChange={onJoinChange}
                  id={key}
                />
              </Flex.Item>

              {Object.keys(rules).length > 1 && idx !== Object.keys(rules).length - 1 ? (
                <Flex.Item key={`${itemKey}-op`}>
                  <Join type={joinType} onToggle={onJoinChange} />
                </Flex.Item>
              ) : null}
            </>
          );
        })}
        <Flex.Item key='add-rule-button-key' size={{ default: 1, tablet: 'content' }}>
          <Dropdown
            toggle={<AddRuleButton>+ Add Filter</AddRuleButton>}
            isExpanded={newRuleExpanded}
            // disabled={!canAddFilter}
            onToggle={(value) => setNewRuleExpanded(value)}
          >
            <RuleEditor isActive={newRuleExpanded} onSubmit={createFilter} />
          </Dropdown>
        </Flex.Item>
        <Flex.Item key='save-segment-button-key' size={{ default: 1, tablet: 'content' }}>
          <Dropdown
            toggle={<AddRuleButton>Save Segment</AddRuleButton>}
            isExpanded={saveSegmentExpanded}
            // disabled={!canAddFilter}
            onToggle={(value) => setSaveSegmentExpanded(value)}
          >
            <Box as='form' minw={200}>
              <TextInput
                value={segmentName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSegmentName(e.target.value);
                }}
              />
              <AddRuleButton onClick={saveSegment}>Save</AddRuleButton>
            </Box>
          </Dropdown>
        </Flex.Item>
      </Flex>
    </FieldsProvider>
  );
};

interface QueryType {
  conditions: Array<ConditionQueryType>;
  logicOperator: 'and' | 'or';
}

interface ConditionQueryType {
  error?: boolean;
  field: string;
  rule: string;
  value: any;
}

export default QueryBuilder;
