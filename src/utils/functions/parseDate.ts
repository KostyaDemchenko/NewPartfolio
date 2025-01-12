export const parseDate = (dateStr: string): number => {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day).getTime();
};
