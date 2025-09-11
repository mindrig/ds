/**
 * Flat promise type. It's a promise with resolve and reject functions
 * as an object.
 */
export interface FlatPromise<Type = void> {
  /** The promise. */
  promise: Promise<Type>;
  /** The resolve function. */
  resolve: (value: Type) => void;
  /** The reject function. */
  reject: (reason?: unknown) => void;
}

/**
 * The function returns object with promise and the control functions. It allows
 * to pass resolve and reject functions as arguments.
 *
 * @returns The flat promise.
 */
export function flatPromise<Type = void>(): FlatPromise<Type> {
  let resolve: (value: Type) => void;
  let reject: (reason?: unknown) => void;

  const promise = new Promise<Type>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}
