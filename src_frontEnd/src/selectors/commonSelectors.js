export const getObjFromKeys = (obj, placeholder = '') => (
  Object.entries(obj).reduce((acc, [key]) => { acc[key] = placeholder; return acc; }, {})
);


export const getFormattedDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString();
};


export const getDataWithEmptyDeletedItem = (data, _id) => {
  const i = data.findIndex(item => item._id === _id);
  return [...data.slice(0, i), { _id }, ...data.slice(i + 1)];
};


const getTransformedDate = date => (
  date.split('/')
    .reduceRight(((acc, dateType, i) => {
      const correctDate = dateType.padStart(2, '0');
      return (i == 1)
        ? [acc, correctDate]
        : Number(`${acc[0]}${correctDate}${acc[1]}`);
    }))
);


export const getSortedByDate = array => array
  .map(item => ({
    ...item,
    dateNum: getTransformedDate(item.date),
  }))
  .sort((a, b) => b.dateNum - a.dateNum);


export const getTenLatestItems = posts => getSortedByDate(posts).slice(0, 10);
