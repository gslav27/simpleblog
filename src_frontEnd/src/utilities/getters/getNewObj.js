export default (obj, placeholder = '') => (
  Object.entries(obj).reduce((acc, [key]) => { acc[key] = placeholder; return acc; }, {})
);
