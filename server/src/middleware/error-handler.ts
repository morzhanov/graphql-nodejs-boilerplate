import {EC, SC} from '../constants/index';
import {NextFunction, Request, Response} from "express";

/**
 * Application error handler
 * @return {Function} middleware
 */
function errorHandler() {
  return (e: any, request: Request, response: Response, next: NextFunction) => {
    return response.status(e.status || SC.SERVER_ERROR)
      .json({
        success: false,
        error_code: e.error_code || EC.SERVER_ERROR,
        error: e.message
      });
  };
}

module.exports = errorHandler;
