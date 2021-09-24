import { Radio, TextInput, VStack } from '@pasha28198/molequle-web-common';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAccordion } from '../Accordion/AccordionProvider';

import { Field, useFieldsContext } from './FieldsProvider';
import Step from './Step';

interface FieldSelectorProps {
  value?: string | number | null;
  onChange: (item: Field) => void;
}

const FieldSelector = ({ value, onChange }: FieldSelectorProps) => {
  const { fields } = useFieldsContext();
  const { toggle } = useAccordion();
  const normalizedValue = useMemo(() => {
    return (value && fields.find((f) => f.value)?.label) || '';
  }, [fields, value]);

  const [inputItems, setInputItems] = useState(fields);
  const [inputValue, setInputValue] = useState<string>(normalizedValue);

  const onInputChange = useCallback(
    (val: string) => {
      const normalizedInputValue = val && val?.trim()?.toLowerCase();
      setInputItems(
        normalizedInputValue
          ? fields.filter((item) => item?.label?.toLowerCase().startsWith(normalizedInputValue))
          : fields,
      );
    },
    [fields],
  );

  useEffect(() => {
    if (value === null) {
      setInputValue('');
    }
  }, [value]);

  return (
    <Step
      index={1}
      placeholder='Search field to filter on'
      value={value}
      header={({ placeholder, toggle: _toggle, value: _value, setValue: _setValue, ...props }) => (
        <TextInput
          {...props}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onInputChange(e.target.value);
            setInputValue(e.target.value);
          }}
        />
      )}
      content={({ value: contentValue, setValue }) => (
        <VStack gap='XS'>
          {inputItems.length ? (
            inputItems.map((item) => (
              <Radio
                id={item.value as string}
                key={uuidv4()}
                value={item.value}
                checked={contentValue === item.value}
                onChange={() => {
                  setValue(item.value as string);
                  setInputValue(item.label);
                  toggle('2', true);
                  onChange(item);
                }}
              >
                {item.label}
              </Radio>
            ))
          ) : (
            <span>
              <strong>{inputValue}</strong> was not found.
            </span>
          )}
        </VStack>
      )}
    />
  );
};

export default FieldSelector;
