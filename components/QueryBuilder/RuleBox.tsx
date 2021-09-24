import React from 'react';
import Rule from './Rule';
import Join from './Join';
import { Flex } from '@pasha28198/molequle-web-common';

export const RuleBox = ({ conditions, onFilterEdit, onFilterDelete, onJoinChange, id }: any) => {
  if (conditions.length === 1) {
    return (
      <Rule
        field={conditions[0].field}
        rule={conditions[0].rule}
        value={conditions[0].value}
        type={conditions[0].type}
        error={conditions[0].error}
        onEdit={(data) => onFilterEdit(data, id)}
        onRemove={() => onFilterDelete(id)}
      />
    );
  }

  return conditions.map((condition: any, idx: number) => {
    return (
      <>
        <Flex.Item key={`${Math.random()}-${condition.field}-${condition.rule}-${id}`}>
          <Rule
            field={condition.field}
            rule={condition.rule}
            value={condition.value}
            type={condition.type}
            error={condition.error}
            onEdit={(data) => onFilterEdit(data, id)}
            onRemove={() => onFilterDelete(id)}
          />
        </Flex.Item>

        {conditions.length > 1 && idx !== conditions.length - 1 ? (
          <Flex.Item key={`${Math.random()}-${id}`}>
            <Join type={condition.logicOperator} onToggle={onJoinChange} />
          </Flex.Item>
        ) : null}
      </>
    );
  });
};
