const CONDITIOINS_MORE_THEN_ONE = 1

function parseConditions(conditions: Array<ConditionQueryType>): Array<ApiConditionType> {
  return conditions.map((item: ConditionQueryType) => ({
    [item.rule]: {
      [item.field]: item.value
    }
  }));
}

export const serializeQuery = (queries: any) => {
  return Object.values(queries).map((query: any) => {
    if (query.conditions.length > CONDITIOINS_MORE_THEN_ONE) {
      return {
        [query.logicOperator]: parseConditions(query.conditions)
      }
    }
    return parseConditions(query.conditions)[0]
  })
};

interface ConditionQueryType {
  error: boolean
  field: string
  rule: string
  value: any
}

interface ApiConditionType {
  [key: string]: {
    [key: string]: string | number
  }
}
