import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret = process.env.JWT_KEY || 'secret';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(404).json({ msg: error.message, error })
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  }
  else
  {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};

export default checkAuth;