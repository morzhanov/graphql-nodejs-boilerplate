/**
 * Returns 404 with error message to client
 * @param  {Object} message message to send
 * @return {Function} middleware
 */
import {Response} from "express";

function notFound(message: any) {
  return (_: any, response: Response) => response.status(404).json(message);
}

module.exports = notFound;
