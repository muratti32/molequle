import { WrapperApi } from "./wrapper.api";

class CampaignApi extends WrapperApi {
  Endpoints: { [key: string]: string } = {
    ROOT: "/campaigns",
  };

  constructor() {
    super();
    this.getCampaignsType = this.getCampaignsType.bind(this);
    this.getCampaigns = this.getCampaigns.bind(this);
    this.getCampaign = this.getCampaign.bind(this);
  }

  async getCampaignsType(): Promise<CampaignsTypeResponse> {
    const response = await this.get(`${this.Endpoints.ROOT}/types`);
    return response;
  }

  async getCampaigns(query?: string): Promise<CampaignsResponse> {
    const response = await this.get(`${this.Endpoints.ROOT}${query || ""}`);
    return response;
  }

  async getCampaign(id: string | number): Promise<CampaignsResponse> {
    const response = await this.get(`${this.Endpoints.ROOT}/${id}`);
    return response;
  }
}

export interface CampaignsTypeResults {
  id: number;
  value: string;
  localization: null;
  statuses: {id:number,name:string}[]
}

export interface CampaignsTypeResponse {
  next: string | null;
  previous: string | null;
  results: CampaignsTypeResults[];
}

export interface CampaignsResults {
  id: number;
  name: string;
  description: string;
  type: CampaignsTypeResults;
  created: string;
  updated: string;
  is_archived: boolean;
  notes: null;
}

export interface CampaignsResponse {
  next: string | null;
  previous: string | null;
  results: CampaignsResults[];
}

export const CampaignProvider = new CampaignApi();
