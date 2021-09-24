// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {Endpoints} from "../../../../lib/user";

const axiosInstance = axios.create()

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const token: any = await axiosInstance.post(
        Endpoints.DOMAIN + Endpoints.GET_ACCESS_TOKEN,
        {
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: Endpoints.DOMAIN + Endpoints.V2
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    )

    const data: any = await axiosInstance.patch(
        Endpoints.DOMAIN + Endpoints.UPDATE_USER + req.query.id,
        {
            name: req.body.name,
            email: req.body.email,
            nickname: req.body.nickname,
            picture: req.body.picture,
            connection: "Username-Password-Authentication"
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${req.cookies.appSession}`
            }
        }
    )

    return res.json(token)
}