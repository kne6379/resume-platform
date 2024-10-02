const hashRounds = +process.env.HASH_ROUNDS;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisUserName = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;

export { hashRounds, redisHost, redisPort, redisUserName, redisPassword };