import dayjs from "dayjs";
import { WrapperApi } from "./wrapper.api";
import { RawField } from "../lib/fields";
import { Person } from "../lib/persons";

class PeopleNextApiProvider extends WrapperApi {
  Endpoints: { [key: string]: string } = {
    ROOT: "/people",
  };

  async searchPeople({
    body,
    page,
  }: {
    body: { [key: string]: string | number | boolean };
    page: number | string | string[];
  }) {
    return this.post(`${this.Endpoints.ROOT}${page === 1 ? '' : `/search?page=${page}`}`, {
      body: JSON.stringify(body),
    });
  }

  async getPeople(query: string) {
    return this.get(`${this.Endpoints.ROOT}${query}`);
  }

  async fetchPerson(id: number): Promise<Person> {
    try {
      const data = await this.get(`${this.Endpoints.ROOT}/${id}`);
      console.log("data ",data)
      return {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        countryCode: data.country_code,
        phone: data.phone,
        isArchived: data.is_archived,
        dateOfBirth: data.date_of_birth,
        accountId: data.account?.id || null,
        account: data.account
          ? {
              id: data?.account?.id,
              name: data?.account?.name,
              industry: data?.account?.industry,
              isArchived: data?.account?.is_archived,
              numberOfEmployees: data?.account?.number_of_employees,
              createdAt: dayjs(data.created).format("DD/MM/YYYY"),
              updatedAt: dayjs(data.updated).format("DD/MM/YYYY"),
            }
          : null,
        updatedAt: data.updated,
        createdAt: data.created,
      };
    } catch (err) {
      return err;
    }
  }
}

export interface PeopleFieldsResponse {
  next: string | null;
  previous: string | null;
  results: RawField[];
}

export const PeopleProvider = new PeopleNextApiProvider();
