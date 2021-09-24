import { useEffect, useState } from "react";
import { RawPerson } from "../../lib/persons";
import { CampaignProvider, CampaignsResponse, CampaignsResults } from "../../api/campaigns.api";
import { PeopleProvider } from "../../api/people.api";
import { useFilters } from "../filters.hook";

export const useCampaign = (campaign_id: number, initPeople: CampaignsResponse):{
  campaign: CampaignsResults | null;
  page: string | number | boolean | undefined;
  people: any;
  next: boolean;
  columns: string[];
  updatePage: (newPage: string | number) => void;
} => {
  const [campaign, setCampaigns] = useState(null);
  const [people, setPeople] = useState(initPeople);
  const { filters, updateFilters } = useFilters({
    init_filters: {
      page: 1,
      campaign_id,
    },
    filtersDidUpdate: ({ newFiltersQueryFormat }) => {
      // eslint-disable-next-line no-void
      void PeopleProvider.getPeople(newFiltersQueryFormat).then((res) => setPeople(res));
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-void
    void CampaignProvider.getCampaign(campaign_id).then((res:any) => setCampaigns(res?.results));
  }, [campaign_id]);

  return {
    campaign,
    page: filters.page,
    people: people?.results || [],
    next: !people.next,
    columns: ["id", "email", "first_name", "last_name"],
    updatePage: (newPage: string | number) => updateFilters("page", newPage),
  };
};
