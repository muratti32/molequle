import { NextApiRequest, NextApiResponse } from "next";
import Tokens from "csrf";

type NextAPIHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

export const tokens = new Tokens();
export const CSRF_COOKIE_NAME = "XSRF-TOKEN";
const IGNORE_METHODS = ["GET", "OPTIONS", "HEAD"];

export const csrf = (handler: NextAPIHandler) => (req: NextApiRequest, res: NextApiResponse):void | Promise<void> => {
  if (req.method && IGNORE_METHODS.includes(req.method)) {
    return handler(req, res);
  }

  const token = req.cookies[CSRF_COOKIE_NAME];
  if (!token || !process.env.CSRF_SECRET || !tokens.verify(process.env.CSRF_SECRET, token)) {
    throw new Error("Invalid CSRF token.");
  }

  return handler(req, res);
};
