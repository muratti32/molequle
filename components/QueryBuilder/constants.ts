export const Rules = {
  '==': {
    label: 'is',
    comparableFieldsOnly: false,
    customValue: true,
  },
  '!=': {
    label: 'is not',
    comparableFieldsOnly: false,
    customValue: true,
  },
  '>': {
    label: 'is greater than',
    comparableFieldsOnly: true,
    customValue: true,
  },
  '>=': {
    label: 'is greater than or equal',
    comparableFieldsOnly: true,
    customValue: true,
  },
  '<': {
    label: 'is less than',
    comparableFieldsOnly: true,
    customValue: true,
  },
  '<=': {
    label: 'is less than or equal',
    comparableFieldsOnly: true,
    customValue: true,
  },
} as const;

export type RuleKey = keyof typeof Rules;
export const ruleKeys = Object.keys(Rules) as RuleKey[];
export const ruleSelectOptions = ruleKeys.map((value) => ({ value, ...Rules[value] }));

export interface Filter {
  field: string | number;
  rule: RuleKey;
  value?: string | number;
  type: string;
}
