const elipsisStr = (str, maxValue) => {
  if (str.length > maxValue) {
    return str.substring(0, maxValue) + "...";
  }
  return str;
};

export { elipsisStr };
