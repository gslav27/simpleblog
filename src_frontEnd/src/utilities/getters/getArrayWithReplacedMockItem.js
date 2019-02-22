/**
 * @param data - array of objects with one/some to replace with mocked
 * @param _id  - id of object to replace
 * @param mockedObjdata - additional data for mocked obj
 */
export const getArrayWithReplacedMockItem = (data, _id, mockedObjdata) => {
  const index = data.findIndex(item => item._id === _id);
  return [...data.slice(0, index), { _id, ...mockedObjdata }, ...data.slice(index + 1)];
};
