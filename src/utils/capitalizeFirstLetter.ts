export const capitalizeFirstLetter = (value: string) => {
  return value.replace(/\b\w/g, (match) => match.toUpperCase());
};
