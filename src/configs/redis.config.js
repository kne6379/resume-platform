import { createClient } from "redis";
import "dotenv/config";
import RedisStore from "connect-redis";

// 레디스 설정
const redisClient = createClient({
	url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
	client: redisClient
});

export { redisStore };
