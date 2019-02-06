export default (items, keysToExclude = []) => (
  items.map(item => (
    Object.keys(item).reduce((modItem, key) => {
      if (keysToExclude.includes(key)) return modItem;
      modItem[key] = item[key];
      return modItem;
    }, {})
  ))
);
