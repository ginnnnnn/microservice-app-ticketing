import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'



export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(public errors: ValidationError[]) {
    super("Invaild request parameters")

    //Only because we are extending a built in class (Error),we need this line
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
  serializeErrors() {
    const formattedErros = this.errors.map(({ param, msg }) => {
      return { message: msg, field: param }
    })
    return formattedErros
  }
}