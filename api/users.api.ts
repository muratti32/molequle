import { WrapperApi } from "./wrapper.api";
import { RawField } from "../lib/fields";
import axios from "axios";
import {Endpoints} from "../lib/user";

class UsersNextApiProvider extends WrapperApi {
  Endpoints: { [key: string]: string } = {
    ROOT: "/users",
  };

  getUserInfo = async ({ id }: { id?: number }): Promise<UsersFieldsResponse> => {
    const response = await this.get(`/users/${id}`);
    return response;
  };

  getToken = async () => {
    return await axios.post(
        Endpoints.DOMAIN + Endpoints.GET_ACCESS_TOKEN,
        {
          grant_type: 'client_credentials',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: Endpoints.DOMAIN + Endpoints.V2,
        },
        {
          headers: {
            'content-type': 'application/json',
          }
        }
    )
  }
}

interface UsersFieldsResponse {
  next: string | null;
  previous: string | null;
  results: RawField[];
}

export const UsersProvider = new UsersNextApiProvider();
