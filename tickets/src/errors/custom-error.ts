export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
    //Only because we are extending a built in class (Error),we need this line
    Object.setPrototypeOf(this, CustomError.prototype)
  }
  abstract serializeErrors(): {
    message: string,
    field?: string
  }[]
}

