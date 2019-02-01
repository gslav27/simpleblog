export default (data, _id) => {
  const index = data.findIndex(item => item._id === _id);
  return [...data.slice(0, index), { _id }, ...data.slice(index + 1)];
};
