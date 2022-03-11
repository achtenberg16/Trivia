export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemLocalStorage = (key) => {
  const result = localStorage.getItem(key);
  return JSON.parse(result);
};

export default setLocalStorage;
