// redisClient.js
const Redis = require("ioredis");
require("dotenv").config();

const redisInstance = new Redis(
  "rediss://default:AdubAAIncDFkODljMjhmMGQ2MWU0YTE0OTk0NjFiOWEwYjI0YzIyNnAxNTYyMTk@good-pipefish-56219.upstash.io:6379"
);

module.exports = redisInstance;
