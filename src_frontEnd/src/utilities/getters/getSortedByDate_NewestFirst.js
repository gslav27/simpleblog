const getYYYYMMDD = date => (
  date.split('/')
    .reduceRight(((acc, dateType, i) => {
      const correctDate = dateType.padStart(2, '0');
      return (i == 1)
        ? [acc, correctDate]
        : Number(`${acc[0]}${correctDate}${acc[1]}`);
    }))
);


export default array => array
  .map(item => ({
    ...item,
    dateNum: getYYYYMMDD(item.date),
  }))
  .sort((a, b) => b.dateNum - a.dateNum);
