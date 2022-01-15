export const setItem = (key: string, value: any): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const getItem = (key: string): unknown => {
  return JSON.parse(window.localStorage.getItem(key) as string);
};
