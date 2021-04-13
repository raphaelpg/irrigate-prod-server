import { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import config from '../config/config';
import { RateLimiterMongo } from 'rate-limiter-flexible';

const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const mongoConn = MongoClient.connect(
  config.mongo.completeUri,
  mongoOpts
);

const opts10 = {
  storeClient: mongoConn,
  dbName: 'IrrigateV2',
  tableName: 'users-rate-limit',
  points: 3000,
  duration: 60 * 2,
  blockDuration: 60 * 10,
};

const rateLimiter10min = new RateLimiterMongo(opts10);

export const rateLimiterSpam = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter10min.consume(req.ip)
  .then(() => {
    next();
  })
  .catch(() => {
    res.status(429).send("Too many requests");
  });
};

const opts1 = {
  storeClient: mongoConn,
  dbName: 'IrrigateV2',
  tableName: 'users-rate-limit-ddos',
  points: 5000,
  duration: 1,
};

const rateLimiter1sec = new RateLimiterMongo(opts1);

export const rateLimiterDDos = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter1sec.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too many requests");
    });
};