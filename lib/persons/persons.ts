import dayjs from 'dayjs';
import { HttpClientSingleton, PaginatedResponse } from '../http';
import { isKnownType, RawField } from '../fields';

export const Endpoints = {
  ROOT: '/people',
};

interface RawAccount {
  id: number;
  name: string;
  industry?: {
    id: number;
    value: string;
    localization: string | null;
  };
  number_of_employees: number;
  created: string;
  updated: string;
  is_archived: boolean;
}

interface Account extends Pick<RawAccount, 'id' | 'name' | 'industry'> {
  numberOfEmployees: number;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface RawPerson {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  account: RawAccount | null;
  account_id?: number | null;
  country_code?: number;
  created: string;
  updated: string;
  is_archived: boolean;
  date_of_birth: string | null;
  phone: string | null;
}

export interface Person {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  account: Account | null;
  accountId: number | null;
  countryCode: number;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  dateOfBirth: string | null;
  phone: string | null;
}

export type RawPeopleListResponse = PaginatedResponse<RawPerson>;

interface PeopleListResponse {
  hasNext: boolean;
  hasPrev: boolean;
  people: RawPerson[];
}

export interface PeopleFieldsResponse {
  next: string | null;
  previous: string | null;
  results: RawField[];
}

export const fetchPeople = async (path: string, page: number): Promise<PeopleListResponse> => {
  try {
    const data = await HttpClientSingleton.get<RawPeopleListResponse>(`${path}?page=${page}`);

    return {
      hasNext: Boolean(data.next),
      hasPrev: Boolean(data.previous),
      people: data.results.map((item) => ({
        ...item,
        account_id: item.account?.id || null,
        updated: dayjs(item.updated).format('DD/MM/YYYY'),
        created: dayjs(item.created).format('DD/MM/YYYY'),
      })),
    };
  } catch (e) {
    return e;
  }
};

export const fetchPersonFields = async (): Promise<RawField[]> => {
  const fields = await HttpClientSingleton.get<PeopleFieldsResponse>(`${Endpoints.ROOT}/fields/`);
  return fields.results?.filter((f) => isKnownType(f));
};

// export const featchPersonSearch = async (key: string, body: any):Promise<PeopleFieldsResponse> => {
//   const fields = await HttpClientSingleton.post<PeopleFieldsResponse>(`${Endpoints.ROOT}/${key}`, {
//     body: JSON.stringify(body),
//   });
//   return fields;
// };

export const fetchPerson = async (path: string, id: number): Promise<Person> => {
  try {
    const data = await HttpClientSingleton.get<RawPerson>(`${path}/${id}`);

    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      countryCode: data.country_code,
      phone: data.phone,
      isArchived: data.is_archived,
      dateOfBirth: data.date_of_birth,
      accountId: data.account?.id || null,
      account: data.account
        ? {
            id: data.account.id,
            name: data.account.name,
            industry: data.account.industry,
            isArchived: data.account.is_archived,
            numberOfEmployees: data.account.number_of_employees,
            createdAt: dayjs(data.created).format('DD/MM/YYYY'),
            updatedAt: dayjs(data.updated).format('DD/MM/YYYY'),
          }
        : null,
      updatedAt: data.updated,
      createdAt: data.created,
    };
  } catch (err) {
    return err;
  }
};
