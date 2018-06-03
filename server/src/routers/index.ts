const {Router} = require('express');

import controllers from '../controllers';
import middleware from '../middleware';

const {errorHandler, notFound} = middleware;
const {generic} = controllers;

const router = new Router();

router
  .get('/health-check', generic.healthCheck)
  .get('/generic', generic.genericGET)
  .post('/generic', generic.genericPOST)
  .put('/generic', generic.genericPUT)
  .delete('/generic', generic.genericDELETE)
  .use(errorHandler())
  .use(notFound('Not Found'));

export default router;
