export const formatProductEditingValue = (name: string, value: string) => {
  return name === "name" ? value : parseInt(value);
};
