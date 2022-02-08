export const menuFormat = item => {
  const itemWords = item.split('_');
  const capCaseWords = itemWords.map(str => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  });
  return capCaseWords.join(' ');
};
