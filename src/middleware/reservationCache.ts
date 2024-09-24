import redis from "../../service/db.redis";
import { Request, Response ,RequestHandler} from "express";

async function reservationCacheHandle(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result || "");
      }
    });
  });
}

async function reservationCacheClear(key: string) {
  return new Promise<void>((resolve, reject) => {
    redis.del(key, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
const hashClearMiddleware:RequestHandler = async (req, res, next) => {
  await next();
  const date = req.body.date;
  reservationCacheClear(date);
};
export { hashClearMiddleware,reservationCacheHandle, reservationCacheClear };
