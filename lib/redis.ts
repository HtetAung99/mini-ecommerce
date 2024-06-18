import { createClient } from "redis";

const redisClient = createClient({
  password: process.env.RACCOON_REDIS_AUTH,
  socket: {
    host: process.env.RACCOON_REDIS_URL,
    port: Number(process.env.RACCOON_REDIS_PORT),
  },
});

redisClient.on("connect", () => {
  console.log("Connected to Redis12345");
});

redisClient.on("error", (err) => {
  console.log(err.message);
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err.message);
  });

export default redisClient;
