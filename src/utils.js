export const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => acc + item.description * item.quantity, 0);
};
