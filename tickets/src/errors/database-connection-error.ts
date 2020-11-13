import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = "Error connecting to database"
  constructor() {
    super("error connecting to DB")

    //Only because we are extending a built in class (Error),we need this line
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
  serializeErrors() {
    return [{ message: this.reason }]
  }
}