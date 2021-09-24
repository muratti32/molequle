import { NextApiRequest, NextApiResponse } from "next";
import { csrf } from "../../../lib/csrf";
import { PeopleProvider } from "../../../api/people.api";

const supportedMethods = ["POST"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method && !supportedMethods.includes(req.method)) {
      return res
        .status(405)
        .send({ error: `${req.method} method is not supported for ${req.url}.` });
    }

    const response = await PeopleProvider.searchPeople({
      body: req.body,
      page: req?.query?.page || 1,
    });
    return res.status(200).json({ response: await response.json() });
  } catch (e) {
   return  e;
  }
};

export default csrf(handler);
