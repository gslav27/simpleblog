/**
 * create new object where: 1.keys = original object keys 2.values = "placeholder"
 * @param {{}} obj - object with keys for new object
 * @param {string} placeholder - placeholder for new object properties values
 * @return {{}} new object
 */
export const getNewObj = (obj, placeholder = '') => (
  Object.entries(obj).reduce((acc, [key]) => { acc[key] = placeholder; return acc; }, {})
);
