const HASH_ROUNDS = +process.env.HASH_ROUNDS;

const NODE_ENV = process.env.NODE_ENV;

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

export { HASH_ROUNDS, REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD, NODE_ENV };
