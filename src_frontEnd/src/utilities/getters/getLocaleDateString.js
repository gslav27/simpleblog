export default (data, type) => {
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
    type === 'DDMMYYYY-HHMMSS' ? styles.time : {},
  );
  return new Date(data).toLocaleDateString(undefined, dateType);
};
