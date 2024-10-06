import { createClient } from "redis";
import RedisStore from "connect-redis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from "../constants/env.constants.js";

// 레디스 설정
const redisClient = createClient({
  url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
});

export { redisClient, redisStore };
