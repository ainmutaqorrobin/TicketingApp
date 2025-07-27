export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";

  constructor() {
    super();

    //use this because extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
