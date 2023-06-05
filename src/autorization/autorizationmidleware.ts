import bodyParser from 'body-parser';
import express, {Response, Request, NextFunction} from 'express';
import { httpStatusCodes } from '../http-status-codes/http-status-codes';




export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const code = Buffer.from("admin:qwerty").toString('base64')  
  if (req.headers.authorization === `Basic ${code}`) {
      next();
    } else {
      res.send(httpStatusCodes.UNAUTHORIZED_401)
    }
  }