import { NextApiRequest, NextApiResponse } from "next";
import { csrf } from "../../../lib/csrf";
import { objectToQuery } from "../../../util/helpers";

const supportedMethods = ["GET", "POST", "PUT"];

const options: { [key: string]: {
  Authorization: string;
  "Content-Type": string;
} } = {
  headers: {
    Authorization: "Token e10daed0a38225816452370c003a3ded", // temporally solution
    "Content-Type": "application/json",
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method && !supportedMethods.includes(req.method)) {
      return res
        .status(405)
        .send({ error: `${req.method} method is not supported for ${req.url}.` });
    }

    const requestUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/${req.query.route}${objectToQuery(
      req.query,
    )}`;

    if (req?.method !== "GET" && req.body) {
      options.body = req.body;
    }

    const response = await fetch(requestUrl, {
      method: req?.method,
      ...options,
    }).then((resp) => resp.json());

    return res.status(200).json(response);
  } catch (e) {
   return  e;
  }
};

export default csrf(handler);
