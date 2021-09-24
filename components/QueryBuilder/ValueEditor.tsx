import { Radio, TextInput } from '@pasha28198/molequle-web-common';
import React from 'react';
import { Filter } from './constants';
import Step from './Step';

interface ValueEditorProps {
  ruleType: string | null;
  value?: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
  handleSubmit: (e: any) => void;
}

const ValueEditor = ({ value, disabled, onChange, handleSubmit, ruleType }: ValueEditorProps) => {
  return (
    <Step
      index={3}
      placeholder='Select filter value'
      value={value}
      disabled={disabled}
      header={({ placeholder, value: stepValue, setValue, toggle, ...props }) => {
        switch (ruleType) {
          case 'input':
            return (
              <TextInput
                {...props}
                placeholder={placeholder}
                value={stepValue || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                onFocus={() => toggle(true)}
              />
            );
            break;
          case 'datepicker':
            return (
              <input
                type='date'
                value={stepValue || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
              ></input>
            );
            break;
          case 'boolean':
            return (
              <>
                <Radio
                  name='yes'
                  key={'boolean-select-yes'}
                  checked={stepValue === 'yes'}
                  value='yes'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                >
                  Yes
                </Radio>
                <Radio
                  name='no'
                  key={'boolean-select-no'}
                  checked={stepValue === 'no'}
                  value='no'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                >
                  No
                </Radio>
              </>
            );
            break;
          default:
            break;
        }
      }}
      action={handleSubmit}
    />
  );
};

export default ValueEditor;
