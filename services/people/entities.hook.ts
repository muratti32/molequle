import { useMemo } from 'react';

interface EntitiesType {
  personFieldsPrefetched: { name: string }[];
  accountFieldsPrefetched: { name: string }[];
}

export const useEntities = ({
  personFieldsPrefetched,
  accountFieldsPrefetched,
}: EntitiesType): {
  entities: any;
  fields: any;
} => {
  const entities = useMemo(() => {
    return [
      {
        key: 'Person',
        fields: (personFieldsPrefetched || []).map((f: { name: string }) => ({
          ...f,
          name: `person.${f.name}`,
        })),
      },
      {
        key: 'Account',
        fields: (accountFieldsPrefetched || []).map((f: { name: string }) => ({
          ...f,
          name: `account.${f.name}`,
        })),
      },
    ] as const;
  }, [personFieldsPrefetched, accountFieldsPrefetched]);

  const fields = useMemo(() => {
    return entities.flatMap((e) => e.fields);
  }, [entities]);

  return {
    entities,
    fields,
  };
};
