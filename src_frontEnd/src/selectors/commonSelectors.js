/* eslint-disable import/prefer-default-export */
export const getObjFromKeys = (obj, placeholder = '') => (
  Object.entries(obj).reduce((acc, [key]) => { acc[key] = placeholder; return acc; }, {})
);
