import { WrapperApi } from "./wrapper.api";

class AccountApiProvider extends WrapperApi {
  Endpoints: { [key: string]: string } = {
    ROOT: "/accounts",
  };

  async fetchAccounts(query?: string): Promise<AccountsResponse> {
    const response = await this.get(`${this.Endpoints.ROOT}${query || ""}`);
    return response;
  }

  async fetchAccountById(id: string | number): Promise<ResultsType> {
    const response = await this.get(`${this.Endpoints.ROOT}/${id}`);
    return response;
  }
}

export interface ResultsType {
  results: any;
  id: number;
  name: string;
  industry: { id: number, value: string, localization: null };
  number_of_employees: number;
  created: string;
  updated: string;
  is_archived: boolean;
}

export interface AccountsResponse {
  next: string | null;
  previous: string | null;
  results: ResultsType[];
}

export const AccountProvider = new AccountApiProvider();
