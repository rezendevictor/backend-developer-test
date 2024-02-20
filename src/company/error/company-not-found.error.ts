export class CompanyNotFoundError extends Error {
  constructor(msg?: string) {
    super(msg);
  }
}
