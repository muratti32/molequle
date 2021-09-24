import React, { useEffect, useMemo, useState } from 'react';
import FieldSelector from './FieldSelector';
import ConditionSelector from './ConditionSelector';
import ValueEditor from './ValueEditor';
import { Filter, Rules } from './constants';
import { Field, useFieldsContext } from './FieldsProvider';
import { Box } from '@pasha28198/molequle-web-common';
import { Accordion } from '..';

type RuleDefaultForm = {
  [P in keyof Filter]: Filter[P] | null;
};

interface RuleEditorProps {
  isActive?: boolean;
  onSubmit?: (value: Filter, isValid: boolean) => void;
  defaultValue?: Filter;
}

const RuleEditor = ({ isActive, onSubmit, defaultValue }: RuleEditorProps) => {
  const initialState = {
    field: defaultValue?.field || null,
    rule: defaultValue?.rule || null,
    value: defaultValue?.value || null,
    type: defaultValue?.type || null,
  };

  const { fields, isComparableField } = useFieldsContext();
  const [rule, setRule] = useState<RuleDefaultForm>(initialState);
  const [isDirty, setIsDirty] = useState(false);
  const [ruleType, setRuleType] = useState('');

  useEffect(() => {
    switch (rule.type) {
      case 'Integer':
      case 'String':
        setRuleType('input');
        break;
      case 'DateTime':
      case 'Date':
        setRuleType('datepicker');
        break;
      case 'Boolean':
        setRuleType('boolean');
        break;
      default:
        break;
    }
  }, [rule]);

  const customValueRequired = useMemo(() => {
    return rule.rule !== null && Rules[rule.rule].customValue;
  }, [rule.rule]);

  const includeComparableRules = useMemo(() => {
    return Boolean(rule.field) && isComparableField(String(rule.field));
  }, [isComparableField, rule.field]);

  const isValid = useMemo(() => {
    return Boolean(rule.field && rule.rule && (customValueRequired ? rule.value : true));
  }, [customValueRequired, rule.field, rule.rule, rule.value]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // if (!isActive && isDirty) {
    if (isDirty) {
      onSubmit?.(rule as Filter, isValid);
      setIsDirty(false);
      if (!defaultValue) {
        setRule(initialState);
      }
    }
  };

  const handleFieldChange = (item: Field) => {
    setRule({ ...rule, field: item.value, type: item.type });
  };

  return (
    <Box as='form' minw={200} onChange={() => setIsDirty(true)}>
      <Accordion allowMultiple={false}>
        <FieldSelector value={rule.field} onChange={handleFieldChange} />
        <ConditionSelector
          value={rule.rule}
          includeComparableRules={includeComparableRules}
          onChange={(val) => setRule({ ...rule, rule: val })}
        />
        <ValueEditor
          ruleType={ruleType}
          value={rule.value as string}
          disabled={!customValueRequired}
          onChange={(val) => setRule({ ...rule, value: val })}
          handleSubmit={handleSubmit}
        />
      </Accordion>
    </Box>
  );
};

export default RuleEditor;
