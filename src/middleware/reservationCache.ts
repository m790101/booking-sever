import moment from "moment";
import redis from "../../service/db.redis";
import { RequestHandler } from "express";

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
const hashClearMiddleware: RequestHandler = async (req, res, next) => {
  await next();
  const yearMonth = moment(req.body.date).format("YYYY-MM");
  reservationCacheClear(yearMonth);
};

const hashClearMutiMiddleware: RequestHandler = async (req, res, next) => {
  await next();
  const monthSet = new Set();
  const dateList = req.body.date;

  dateList.forEach((date: string) => {
    const yearMonth = moment(date).format("YYYY-MM");
    monthSet.add(yearMonth);
  });
  monthSet.forEach((month: any) => {
    reservationCacheClear(month);
  });
};

export { hashClearMiddleware, reservationCacheHandle, reservationCacheClear, hashClearMutiMiddleware };
