/**
 * SolanaPick SDK utility helpers:
 * - Retry logic for async operations (withRetry)
 */

/**
 * Retry an async function on 429 errors with exponential backoff.
 *
 * @template T
 * @param {() => Promise<T>} fn - The async function to call.
 * @param {number} [maxRetries=5] - Maximum number of retries (default: 5).
 * @param {number} [delay=1000] - Initial delay in ms (default: 1000). Delay doubles on each retry.
 * @returns {Promise<T>} The result of the async function if successful.
 *
 * @throws {Error} If the function throws an error other than 429, or if max retries are exceeded.
 *
 * @example
 *   const result = await withRetry(() => verifyTransaction({ ... }), 10, 500);
 */
export async function withRetry<T>(fn: () => Promise<T>, maxRetries: number = 5, delay: number = 1000): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      if (
        err instanceof Error &&
        err.message &&
        err.message.includes("429") &&
        attempt < maxRetries
      ) {
        attempt++;
        console.warn(`429 Too Many Requests. Retrying in ${delay}ms... (Attempt ${attempt})`);
        await new Promise(res => setTimeout(res, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw err;
      }
    }
  }
} 