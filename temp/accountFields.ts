import { isKnownType } from '../lib/fields';

export const rootAccountFields = [
  {
    name: 'id',
    label: 'ID',
    type: 'I',
    read_only: true,
    required: false,
    custom_field: false,
  },
  {
    name: 'name',
    label: null,
    type: 'S',
    read_only: false,
    required: true,
    custom_field: false,
  },
  {
    name: 'number_of_employees',
    label: null,
    type: 'I',
    read_only: false,
    required: false,
    custom_field: false,
  },
  {
    name: 'created_at',
    label: null,
    type: 'DT',
    read_only: true,
    required: false,
    custom_field: false,
  },
  {
    name: 'updated_at',
    label: null,
    type: 'DT',
    read_only: true,
    required: false,
    custom_field: false,
  },
  {
    name: 'archived',
    label: null,
    type: 'BooleanField',
    read_only: false,
    required: false,
    custom_field: false,
  },
];

export const filteredAccountFields = rootAccountFields.filter((f) => isKnownType(f));
