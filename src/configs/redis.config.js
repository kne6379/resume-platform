import { createClient } from "redis";
import RedisStore from "connect-redis";
import { redisHost, redisPassword, redisPort, redisUserName } from "../constants/env.constants.js";

// 레디스 설정
const redisClient = createClient({
	url: `redis://${redisUserName}:${redisPassword}@${redisHost}:${redisPort}`,
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
	client: redisClient
});

export { redisClient, redisStore };
