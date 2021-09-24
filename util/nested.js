const possibleCondition = ["==", "in", "!=", "not", "not in", "<", "<=", ">", ">="]
const positiveCondition = ["==", "in"];
const negativeCondition = ["!=", "not", "not in"];
const numberCondition = ["<", "<=", ">", ">="];

function getValue(searchableKey, data, parent) {
  if (typeof searchableKey !== "string") throw new Error("searchableKey should be a string");
  if (Number.isNaN(data) || !data) throw new Error("data should be right format Object or Array");
  if (typeof data === "object" && data[searchableKey]) return parent ? {
    [Object.keys(parent)[0]]: data[searchableKey]
  } : data[searchableKey];
  if (typeof data === "object") {
    return Object
      .keys(data)
      .map(key => getValue(searchableKey, data[key], {[key]: data[key]}))
      .flat()
  }

  return Array.isArray(data)
    ? data.map((item) => getValue(searchableKey, item, item))
    : null;
}

// function findAvailableValue(data) {
//  data.map(item => {
//    if (positiveCondition.includes(Object.keys(item)[0]))
//  })
// }



const data = {
  "and": [
    {
      "in": {
        "country_code": [
          "DE",
          "FR",
          "UK"
        ]
      }
    },
    {
      "not in": {
        "country_code": [
          "US",
          "CA"
        ]
      }
    },
    {
      "last_name": "John"
    },
    {
      "first_name": "Soe"
    }
  ]
}

const fields = [
  {
    lable: 'country_code',
    name: 'country_code'
  }
]



console.log( getValue("country_code", data));


{ country_code: [ { in: [Array] }, { 'not in': [Array] }, null ] }

