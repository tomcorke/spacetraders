export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  validator?: (result: T) => boolean
): Promise<T> => {
  let attempts = 0;
  while (attempts < maxAttempts) {
    attempts++;
    try {
      const result = await fn();
      if (validator) {
        const success = validator(result);
        if (!success) {
          throw Error("Validator failed");
        }
      }
      return result;
    } catch (e) {
      if (attempts === maxAttempts) {
        throw e;
      }
    }
  }
  throw Error("Attempts exceeded maxAttempts, this should never happen");
};
