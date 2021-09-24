import { HttpClientSingleton, PaginatedResponse } from '../http';
import { isKnownType, RawField } from '../fields';

export const Endpoints = {
  ROOT: '/accounts',
};

type AccountFieldsResponse = PaginatedResponse<RawField>;

export const fetchAccountFields = async (): Promise<RawField[]> => {
  const fields = await HttpClientSingleton.get<AccountFieldsResponse>(`${Endpoints.ROOT}/schema/`);
  return fields.results?.filter((f) => isKnownType(f));
};
