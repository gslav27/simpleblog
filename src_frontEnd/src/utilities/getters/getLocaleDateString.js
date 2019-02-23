/**
 * convert numeric value to localeDateString
 * @param {number} data - numeric value of the time for the specified date
 * according to universal time
 * @param {string} type - "MMDDYYYY-HHMMSS" or null
 * @return {string} localeDateString
 */
export const getLocaleDateString = (data, type = '') => {
  const styles = {
    day: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
  };
  const dateType = Object.assign(
    styles.day,
    type === 'MMDDYYYY-HHMMSS' ? styles.time : {},
  );
  return new Date(data).toLocaleDateString(undefined, dateType);
};
