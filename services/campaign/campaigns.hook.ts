import { useState } from "react";
import { useFilters } from "../../services/filters.hook";
import { CampaignProvider, CampaignsResponse, CampaignsResults } from "../../api/campaigns.api";

export const useCampaigns = (initAccounts: CampaignsResponse):{
  page: string | number | boolean | undefined;
  setPage: (newPage: number) => void;
  accounts: CampaignsResults[];
  nextPage: boolean;
  fields: string[];
} => {
  const [campaigns, setCampaigns] = useState<CampaignsResponse>(initAccounts);

  const { filters, updateFilters } = useFilters({
    init_filters: {
      page: 1,
    },
    filtersDidUpdate: ({ newFiltersQueryFormat }) => {
      CampaignProvider.getCampaigns(newFiltersQueryFormat).then((res:any) => setCampaigns(res)).catch(()=>{});
    },
  });

  return {
    page: filters.page,
    setPage: (newPage: number) => updateFilters("page", newPage),
    accounts: campaigns?.results,
    nextPage: !campaigns?.next,
    fields: ["id", "name", "description"],
  };
};
