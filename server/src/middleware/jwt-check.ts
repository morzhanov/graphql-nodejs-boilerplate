import {SC, SALT} from '../constants';
import jwt = require('jsonwebtoken');
import {NextFunction, Response} from "express";

/**
 * Middleware to check jsonwebtokens
 * @param req - request object
 * @param res - response object
 * @param next - next middleware
 */
module.exports = function (req: any, res: Response, next: NextFunction) {
  const token: string = req.headers['x-token'];

  console.log('token = ' + token);

  // decode token
  if (token) {
    console.log('token is available');

    // verify SALT and checks exp
    jwt.verify(token, SALT, function (err: Error, decoded: any) {
      if (err) {
        console.log('token = ' + token);

        console.log('error when verify token: ' + err);

        return res.status(SC.UNAUTHORIZED)
          .json({
            success: false,
            error: 'Failed to authenticate token.'
          });
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an HTTP response of 403 (access forbidden) and an error message
    return res.status(SC.UNAUTHORIZED)
      .json({
        success: false,
        error: 'No token provided.'
      });
  }
};
