import {NextFunction, Request, Response} from "express";

const {SC} = require('../constants');

export default {

  /**
   * Endpoint to check is server alive
   * @param req - request object
   * @param res - response object
   * @returns {Promise.<void>}
   */
  healthCheck: (req: Request, res: Response) => {
    // send health check response
    return res.status(SC.SUCCESS).json({success: true, message: 'alive'});
  },
  /**
   * generic get endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericGET: async ({headers, query, params}: Request, res: Response, next: NextFunction) => {
    res.status(SC.SUCCESS).json();
  },
  /**
   * generic post endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericPOST: async ({headers, body, query, params}: Request, res: Response, next: NextFunction) => {
    res.status(SC.SUCCESS).json();
  },
  /**
   * generic put endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericPUT: async ({headers, body, query, params}: Request, res: Response, next: NextFunction) => {
    res.status(SC.SUCCESS).json();
  },
  /**
   * generic delete endpoint
   * @param headers
   * @param query
   * @param params
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  genericDELETE: async ({headers, query, params}: Request, res: Response, next: NextFunction) => {
    res.status(SC.SUCCESS).json();
  },
};
