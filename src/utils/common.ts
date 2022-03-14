export const capitalizeString = (str: string) => {
  const toString = '' + str;
  if (!toString) return '';
  return `${toString[0].toUpperCase()}${toString.slice(1)}`;
};

export const getMarkColor = (mark: number) => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};
