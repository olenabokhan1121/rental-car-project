export const getFilteredParams = (filters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );
};
export const formatMileage = (value) => {
  if (!value) return "";
  return `${new Intl.NumberFormat("en-US").format(Number(value))} km`;
};

export const inputformatMileage = (value) => {
  if (!value) return "";
  return Number(value).toLocaleString("en-US");
};
