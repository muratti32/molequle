export const CustomFieldTypes = {
  // STRING: 'String',
  // INTEGER: 'I',
  // CURRENCY: 'C',
  // FLOAT: 'F',
  DATE: 'Date',
  // TIME: 'T',
  // DATETIME: 'DT',
  // REFERENCE: 'R',
  // LOOKUP: 'L',
} as const;

//updated this enum based on response objects custom_field field. if a type is custom_field === false, i put it here
export const FieldTypes = {
  IF: 'Integer',
  ST: 'String',
  // CF: 'CharField',
  // RF: 'Reference',
  DTF: 'DateTime',
  BF: 'Boolean',
  // EF: 'EmailField',
} as const;
// export const CustomFieldTypes = {
//   STRING: "S",
//   INTEGER: "I",
//   CURRENCY: "C",
//   FLOAT: "F",
//   DATE: "D",
//   TIME: "T",
//   DATETIME: "DT",
//   REFERENCE: "R",
//   LOOKUP: "L",
// } as const;

// export const FieldTypes = {
//   IF: "IntegerField",
//   CF: "CharField",
//   DTF: "DateTimeField",
//   BF: "BooleanField",
//   EF: "EmailField",
// } as const;

export type FieldType = typeof FieldTypes[keyof typeof FieldTypes];
export type CustomFieldType = typeof CustomFieldTypes[keyof typeof CustomFieldTypes];

export interface RawField {
  name: string;
  label: string;
  type: FieldType | CustomFieldType;
  read_only: boolean;
  required: boolean;
  is_custom: boolean;
}

export interface StringField extends RawField {
  max_length: number;
}

export interface NumericField extends RawField {
  min_value?: number;
}

export const isComparable = (type: string): boolean => {
  return (
    type === FieldTypes.IF ||
    type === FieldTypes.DTF ||
    // type === CustomFieldTypes.INTEGER ||
    // type === CustomFieldTypes.FLOAT ||
    // type === CustomFieldTypes.TIME ||
    // type === CustomFieldTypes.DATETIME ||
    type === CustomFieldTypes.DATE
  );
};

export const isStringField = (field: RawField): field is StringField => {
  const stringFieldTypes = [FieldTypes.ST] as string[];
  return stringFieldTypes.includes(field.type);
};

export const isNumericField = (field: RawField): field is NumericField => {
  const numericFieldTypes = [FieldTypes.IF] as string[];
  return numericFieldTypes.includes(field.type);
};

export const isKnownType = (field: RawField): boolean => {
  return (
    Object.values(CustomFieldTypes).includes(field.type as CustomFieldType) ||
    Object.values(FieldTypes).includes(field.type as FieldType)
  );
};
