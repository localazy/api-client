export class LocalazyError extends Error {
  public code: number;

  constructor(message: string, code: number, options?: ErrorOptions) {
    super(message, options);

    this.name = 'LocalazyError';
    this.code = code;
  }
}
