/**
 * Asserts that the given value is not null or undefined. If the value is null or undefined,
 * an error is thrown with the provided message.
 *
 * @param value The value to check for `null` or `undefined`.
 * @param message The error message to be thrown if the assertion fails.
 * @return Returns the original value if it is not `null` or `undefined`.
 *
 * @throws Error Throws an error if the value is `null` or `undefined`.
 */
export function assertNotNull<T>(
  value: T | null | undefined,
  message: string = 'Expected value, got null or undefined',
): T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }

  return value;
}
