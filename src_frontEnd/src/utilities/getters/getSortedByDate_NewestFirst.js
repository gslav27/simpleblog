/**
 * get array of objects with property "date"{number} and return sorted by date array (newest first)
 * @param {[{date: number}]} array - array of objects (objects should have property "date"{number})
 * @return {array} sorted array
 */
export const getSortedByDateNewestFirst = array => array.sort((itemA, itemB) => itemB.date - itemA.date);
