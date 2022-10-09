export const randomGenerator = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min);
};
