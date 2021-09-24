export function objectToQuery(obj: { [key: string]:number | string | string[] | null | boolean}): string {
  if (!obj) return "";
  return Object.keys(obj).reduce(
    (prev: string, current: string) => (obj[current] ? `${prev}${current}=${obj[current]}&` : prev),
    "?",
  );
}

export function parseAfterPromiseAll(
  /* eslint-disable-next-line */
  promiseAllResult: Array<any>,
  listKeysByOrderOfPromiseAllResult: Array<string>,
  ): { [key: string]: string | number | null } {
  return promiseAllResult.reduce((newObject, promiseResult, idx) => {
    return {
      ...newObject,
      [listKeysByOrderOfPromiseAllResult[idx]]: promiseResult,
    };
  }, {});
}
