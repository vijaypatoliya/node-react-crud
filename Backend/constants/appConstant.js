const ROOT_PATH = process.cwd();
const env = require('dotenv').config();

exports.rootPath = ROOT_PATH;

exports.config = {
  PORT: env.parsed.PORT,
  DATABASE: env.parsed.DATABASE,
  API_URL: env.parsed.API_URL,
};

exports.JWT_SECRET = 'tothetop';

exports.responseCode = {
  success: 200,
  badRequest: 400,
  internalServerError: 500,
  unAuthorizedRequest: 401,
  notFound: 404,
  validationError: 422,
};
