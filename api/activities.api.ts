import { WrapperApi } from "./wrapper.api";

class ActivitiesApi extends WrapperApi {
  Endpoints: { [key: string]: string } = {
    ROOT: "/activities",
  };

  constructor() {
    super();
    this.getActivities = this.getActivities.bind(this);
    // this.getTypesOfActivities = this.getTypesOfActivities.bind(this);
    this.getGroupsOfActivities = this.getGroupsOfActivities.bind(this);
  }

  async getActivities({ query }: { query?: string }): Promise<ActivitiesResponse> {
    const response = await this.get(`${this.Endpoints.ROOT}${query || ""}`);
    return response;
  }

  // async getTypesOfActivities(activityGroupId: number): Promise<any> {
  //   const response = await this.get<any>(`/api${this.Endpoints.ROOT}/${activityGroupId}/types`);
  //   console.log(response)
  //   return response;
  // }

  async getGroupsOfActivities(): Promise<GroupsOfActivitiesResponse> {
    const response = await this.get(`${this.Endpoints.ROOT}/groups`);
    return response;
  }
}

interface ResultsType {
  id: number;
  name: string;
  industry: { id: number, value: string, localization: null };
  number_of_employees: number;
  created: string;
  updated: string;
  is_archived: boolean;
}

export interface ActivitiesResponse {
  next: string | null;
  previous: string | null;
  results: ResultsType[];
}

export interface GroupsOfActivitiesResultsType {
  id: number;
  name: string;
  types: { id: number, name: string, description:string, attributes:string[] }[];
  description: string;
}

export interface GroupsOfActivitiesResponse {
  next: string | null;
  previous: string | null;
  results: GroupsOfActivitiesResultsType[];
}

export const ActivitiesProvider = new ActivitiesApi();
