import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { CampaignProvider, CampaignsResults, CampaignsTypeResponse } from "../api/campaigns.api";
import { objectToQuery } from "../util/helpers";

const useCampaignTypes = () => {
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  return useQuery([CampaignProvider.Endpoints.ROOT], CampaignProvider.getCampaignsType, {
    staleTime: Infinity,
  });
};

const useCampaignList = (type: string | null) => {
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  return useQuery([objectToQuery({ type })], CampaignProvider.getCampaigns, {
    staleTime: Infinity,
  });
};

export const useCampaign = ():{
  campaignTypes: any;
  setCampaignType: Dispatch<SetStateAction<string | null>>;
  campaign: CampaignsResults[];
} => {
  const [campaignType, setCampaignType] = useState<any>(null);
  const { data: campaignTypes } = useCampaignTypes();
  const { data: campaign } = useCampaignList(campaignType);

  return {
    campaignTypes: campaignTypes ,
    setCampaignType,
    campaign: campaign?.results || [],
  };
};
