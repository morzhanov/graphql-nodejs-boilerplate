const {Router} = require('express');

const Generic = require('../controllers/generic');
const ErrorHandler = require('../middleware/error-handler');
const NotFound = require('../middleware/not-found');

const router = new Router();

router
  .get('/health-check', Generic.healthCheck)
  .get('/generic', Generic.genericGET)
  .post('/generic', Generic.genericPOST)
  .put('/generic', Generic.genericPUT)
  .delete('/generic', Generic.genericDELETE)
  .use(ErrorHandler())
  .use(NotFound('Not Found'));

module.exports = router;
