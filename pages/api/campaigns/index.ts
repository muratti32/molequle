import { NextApiRequest, NextApiResponse } from "next";
import { csrf } from "../../../lib/csrf";
import { CampaignProvider } from "../../../api/campaigns.api";
import { objectToQuery } from "../../../util/helpers";

const supportedMethods = ["GET"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method && !supportedMethods.includes(req.method)) {
      return res
        .status(405)
        .send({ error: `${req.method} method is not supported for ${req.url}.` });
    }

    const response = await CampaignProvider.getCampaigns(objectToQuery(req.query));
    return res.status(200).json(response || []);
  } catch (e) {
   return e ;
  }
};

export default csrf(handler);
