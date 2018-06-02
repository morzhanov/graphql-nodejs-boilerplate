import {EC, SC} from '../constants';

/**
 * CustomError class
 * @param message - error message
 * @param ec - error code
 */
module.exports = function CustomError(message: string, ec: number) {
  let status;

  // parse error code and generate status code
  switch (ec) {
    case EC.SERVER_ERROR:
    case EC.DATA_NOT_SAVED:
      status = SC.SERVER_ERROR;
      break;
    case EC.DATA_NOT_PROVIDED:
    case EC.DATA_VALIDATION_FAILED:
    case EC.TRY_OTHER_AUTH:
    case EC.DATA_NOT_FOUND:
    case EC.USER_EXISTS:
    case EC.WRONG_PASSWORD:
    case EC.WRONG_EMAIL:
      status = SC.BAD_REQUEST;
      break;
    case EC.NOT_OUR_APP:
      status = SC.UNAUTHORIZED;
      break;
  }

  // create error object
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.error_code = ec || EC.SERVER_ERROR;
  this.status = status || SC.SERVER_ERROR;
};

require('util').inherits(module.exports, Error);
