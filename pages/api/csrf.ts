import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { CSRF_COOKIE_NAME, tokens } from "../../lib/csrf";

const setCSRFToken = (req: NextApiRequest, res: NextApiResponse):void => {
  if (!process.env.CSRF_SECRET) {
    throw new Error("CSRF_SECRET is not present in current env.");
  }
  const token = tokens.create(process.env.CSRF_SECRET);
  res.setHeader(
    "Set-Cookie",
    serialize(CSRF_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 7200,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : undefined,
      secure: process.env.NODE_ENV === "production",
      path: "/"
    }),
  );
  res.status(200).send("OK");
};

export default setCSRFToken;
