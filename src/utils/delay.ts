export const delay = (ms: number = 150) =>
  new Promise((resolve): void => {
    setTimeout(resolve, ms);
  });
