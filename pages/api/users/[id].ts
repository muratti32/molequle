import { NextApiRequest, NextApiResponse } from "next";
import { csrf } from "../../../lib/csrf";

const supportedMethods = ["POST"];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method && !supportedMethods.includes(req.method)) {
    return res.status(405).send({ error: `${req.method} method is not supported for ${req.url}.` });
  }

  return res.status(200).json({ message: "This API route is protected." });
};

export default csrf(handler);
