import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import { RuleKey, Rules, ruleSelectOptions } from './constants';
import Step from './Step';
import { Radio, VStack } from '@pasha28198/molequle-web-common';
import { useAccordion } from '../Accordion/AccordionProvider';

interface ConditionSelectorProps {
  value?: string | null;
  includeComparableRules: boolean;
  onChange: (value: RuleKey) => void;
}

const ConditionLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLighter};
`;

const ConditionSelector = ({ value, includeComparableRules, onChange }: ConditionSelectorProps) => {
  const { toggle } = useAccordion();
  const options = useMemo(() => {
    return includeComparableRules
      ? ruleSelectOptions
      : ruleSelectOptions.filter((r) => !r.comparableFieldsOnly);
  }, [includeComparableRules]);

  return (
    <Step
      index={2}
      placeholder='Select filter condition'
      value={value}
      header={({
        placeholder,
        value: stepValue,
        setValue: _setValue,
        toggle: _toggle,
        ...props
      }) => (
        <ConditionLabel role='button' {...props}>
          {stepValue ? Rules[stepValue as RuleKey].label : placeholder}
        </ConditionLabel>
      )}
      content={({ value: stepValue, setValue }) => (
        <VStack gap='XS'>
          {options.map((item) => (
            <Radio
              id={item.value}
              key={item.value}
              value={item.value}
              checked={stepValue === item.value}
              onChange={() => {
                setValue(item.value as string);
                toggle('3', true);
                onChange(item.value);
              }}
            >
              {item.label}
            </Radio>
          ))}
        </VStack>
      )}
    />
  );
};

export default ConditionSelector;
