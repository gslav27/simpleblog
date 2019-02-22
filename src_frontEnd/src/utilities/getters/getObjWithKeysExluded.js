/**
 * @param obj - object from which to exclude keys
 * @param keysToExclude - array of keys to exclude from object
 * @return new object without passed keys
 */
export const getObjectWithKeysExcluded = (obj, keysToExclude) => (
  Object.keys(obj).reduce((newObj, key) => {
    const ind = keysToExclude.indexOf(key);
    if (~ind) return newObj;
    newObj[key] = obj[key];
    return newObj;
  }, {})
);
