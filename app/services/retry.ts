export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts = 3
): Promise<T> => {
  let attempts = 0;
  while (attempts < maxAttempts) {
    attempts++;
    try {
      return await fn();
    } catch (e) {
      if (attempts === maxAttempts) {
        throw e;
      }
    }
  }
  throw Error("Attempts exceeded maxAttempts, this should never happen");
};
