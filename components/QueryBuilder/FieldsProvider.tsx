import React, { useCallback, useContext, useMemo } from 'react';

export interface Field {
  value: string | number;
  label: string;
  isComparable: boolean;
  type: string;
}

interface FieldsProviderAPI {
  fields: Field[];
  isComparableField: (fieldValue: Field['value']) => boolean;
}

const FieldsContext = React.createContext<FieldsProviderAPI>(null!);

export const useFieldsContext = () => {
  const context = useContext(FieldsContext);

  if (!context) {
    throw new Error('This hook must be used inside FieldsProvider.');
  }

  return context;
};

type FieldsProviderProps = Pick<FieldsProviderAPI, 'fields'>;

export const FieldsProvider = ({ fields, children }: React.PropsWithChildren<FieldsProviderProps>) => {
  const fieldsMap = useMemo(
    () =>
      fields.reduce((acc, curr) => {
        acc[curr.value] = curr;
        return acc;
      }, {} as Record<string | number, Field>),
    [fields],
  );

  const isComparableField = useCallback(
    (fieldValue: string | number) => {
      const field = fieldsMap[fieldValue];
      return Boolean(field?.isComparable);
    },
    [fieldsMap],
  );

  return <FieldsContext.Provider value={{ fields, isComparableField }}>{children}</FieldsContext.Provider>;
};
