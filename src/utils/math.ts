export const randomNumber = (number: number | string): number => {
  if (typeof number === "number") {
    return Math.floor(Math.random() * number);
  } else {
    return Math.floor(Math.random() * Number(number));
  }
};
