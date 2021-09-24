import { useEffect, useState } from "react";
import { PeopleProvider } from "../../api/people.api";
import { AccountProvider, ResultsType } from "../../api/account.api";
import { objectToQuery } from "../../util/helpers";
import { RawPerson } from "../../lib/persons";

export const useAccount = (account_id: number):{
  account: ResultsType | null;
  people: RawPerson[];
} => {
  const [account, setAccount] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    Promise.all([
      AccountProvider.fetchAccountById(account_id).then((res:any) => setAccount(res?.results[0])).catch(()=>{}),
      PeopleProvider.getPeople(objectToQuery({ account_id })).then((res) =>
        setPeople(res?.results),
      ).catch(()=>{}),
    ]).then(()=>{}).catch(()=>{});
  }, [account_id]);

  return {
    account,
    people,
  };
};
