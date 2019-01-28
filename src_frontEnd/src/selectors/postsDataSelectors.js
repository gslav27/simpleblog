const getTransformedDate = date => (
  date.split('/')
    .reduceRight(((acc, dateType, i) => {
      const correctDate = dateType.padStart(2, '0');
      return (i == 1)
        ? [acc, correctDate]
        : Number(`${acc[0]}${correctDate}${acc[1]}`);
    }))
);


/* eslint-disable import/prefer-default-export */
export const getLatestPosts = posts => posts
  .map(post => ({
    ...post,
    dateNum: getTransformedDate(post.date),
  }))
  .sort((a, b) => b.dateNum - a.dateNum)
  .slice(0, 10);
