import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useUIDSeed } from 'react-uid';
import { Box } from '@pasha28198/molequle-web-common';
import { useAccordionItem } from '..';
import { AddRuleButton } from './QueryBuilder';

interface StepProps {
  index: number;
  placeholder: string;
  header: (
    headerInfo: {
      placeholder: string;
      value: string | null;
      setValue: (value: string) => void;
      toggle: (state?: boolean) => void;
    } & Partial<ReturnType<typeof useAccordionItem>['toggleProps']>,
  ) => React.ReactNode;
  content?: (contentProps: {
    value: string | null;
    setValue: (value: string) => void;
  }) => React.ReactNode;
  value?: string | null;
  disabled?: boolean;
  action?: (e: any) => void;
}

const StyledStep = styled(Box)`
  max-height: 240px;
  overflow-y: auto;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gainsboro};
  }
`;

const StepInfo = styled.span<{ isActive: boolean; isValueSet: boolean }>`
  display: inline-flex;
  width: 100%;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.XS} ${theme.space.S}`};
  text-align: left;

  &:focus {
    outline: none;
  }

  & > label {
    margin-right: 1em;
    color: ${({ theme, isActive }) => (isActive ? theme.colors.pink : theme.colors.textDark)};
    font-weight: bold;
  }

  & > * {
    color: ${({ theme, isActive, isValueSet }) => {
      if (isActive) {
        return theme.colors.pink;
      }

      if (isValueSet) {
        return theme.colors.textLighter;
      }

      return 'inherit';
    }};
  }
`;

const Step = ({ index, placeholder, header, content, value, disabled, action }: StepProps) => {
  const seed = useUIDSeed();
  const id = seed(`${index}-${placeholder}`);
  const { labelProps, toggleProps, contentProps, isOpen, toggle } = useAccordionItem({
    // id,
    id: index.toString(),
    disabled,
  });
  const [internalValue, setInternalValue] = useState<string | null>(value || null);

  const onContentValueChange = useCallback((val: string) => {
    setInternalValue(val);
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <StyledStep>
      <StepInfo isActive={isOpen} isValueSet={Boolean(internalValue)}>
        <label {...labelProps}>{index}</label>
        {header({
          placeholder,
          value: internalValue,
          setValue: onContentValueChange,
          id,
          toggle,
          disabled,
          ...(content ? toggleProps : {}),
        })}
        {action && isOpen && <AddRuleButton onClick={action}> submit </AddRuleButton>}
      </StepInfo>
      {content ? (
        <Box {...contentProps}>
          <Box py='XS' px='M'>
            {content({ value: internalValue, setValue: onContentValueChange })}
          </Box>
        </Box>
      ) : null}
    </StyledStep>
  );
};

export default Step;
