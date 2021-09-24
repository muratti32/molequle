import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { lighten } from 'polished';

import RuleEditor from './RuleEditor';
import { Filter, Rules } from './constants';
import { useFieldsContext } from './FieldsProvider';
import { Close, Dropdown, IconButton, IconProps, theme } from '@pasha28198/molequle-web-common';

export interface RuleProps extends Filter {
  onEdit: (data: Filter) => void;
  onRemove: () => void;
  icon?: React.ComponentType<IconProps>;
  error?: boolean;
}

const RuleDropdownLabel = styled.span<{ error?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.XXS} ${theme.space.M}`};
  background: ${({ theme }) => theme.colors.grayLight};
  border-radius: 15px;

  & > * + * {
    margin-left: 0.25rem;
  }

  &:hover {
    & > button {
      background: ${({ theme }) => theme.colors.grayLight};
      opacity: 1;
    }
  }

  & > button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: ${theme.space.XS};
    margin: 0;
    border-radius: 0 15px 15px 0;
    visibility: none;
    opacity: 0;
    transition: all 0.3s ease-out;

    @media (hover: none) {
      border-left: 1px solid ${theme.colors.gainsboro};
      background: inherit;
      opacity: 1;
    }
  }

  @media (hover: none) {
    padding-right: ${({ theme }) => `calc(${theme.space.S} + 1.25em)`};
  }

  ${({ theme, error }) =>
    error && {
      border: `1px solid ${theme.colors.danger}`,
      background: lighten(0.5, theme.colors.danger),
      color: theme.colors.danger,
    }}
`;

const removeButtonStyles = (theme: Theme, error?: boolean) => css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: ${theme.space.XXS};
  margin: 0;
  border-radius: 0 10px 10px 0;
  visibility: none;
  opacity: 0;
  transform: all 1s

  &:hover {
    opacity: 1;
  }

  @media (hover: none) {
    border-left: 1px solid ${theme.colors.gainsboro};
    background: inherit;
    opacity: 1;
  }
`;

const Rule = ({ error, field, rule, icon: Icon, value, onEdit, onRemove }: RuleProps) => {
  const [editorExpanded, setEditorExpanded] = useState(false);
  const { fields } = useFieldsContext();
  const fieldObject = useMemo(() => fields.find((f) => f.value === field), [fields, field]);
  const editorValue = useMemo(() => ({ field, rule, value }), [field, rule, value]);

  const onEditSubmit = useCallback(
    (data: Filter) => {
      onEdit(data);
      setTimeout(() => {
        setEditorExpanded(false);
      });
    },
    [onEdit],
  );

  return (
    <Dropdown
      isExpanded={editorExpanded}
      toggle={
        <RuleDropdownLabel error={error}>
          {error ? (
            <strong>Invalid filter value</strong>
          ) : (
            <>
              {Icon ? (
                <>
                  <Icon width='1.5em' height='1.5em' />
                  &nbsp;
                </>
              ) : null}
              <strong>{fieldObject?.label || field}</strong>
              <span>{Rules[rule].label}</span>
              {value ? <strong>{value}</strong> : null}
            </>
          )}
          <IconButton
            title='Remove filter'
            /* @ts-ignore */
            // className={removeButtonStyles(theme, error).name}
            onClick={onRemove}
          >
            <Close width='1.25em' height='1.25em' />
          </IconButton>
        </RuleDropdownLabel>
      }
      onToggle={(state) => setEditorExpanded(state)}
    >
      <RuleEditor defaultValue={editorValue} isActive={editorExpanded} onSubmit={onEditSubmit} />
    </Dropdown>
  );
};

export default Rule;
