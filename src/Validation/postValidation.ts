import {body, FieldValidationError, ValidationError, validationResult} from "express-validator";
import { httpStatusCodes } from "../http-status-codes/http-status-codes";
import { Request, Response, NextFunction} from "express";
import { db } from "../repositories/db";

export const idPostValidation = body("id").exists().isString().trim().notEmpty(); 
export const titlePostValidation = body("title").exists().isString().trim().notEmpty();
export const shortDescriptionPostValidation = body("shortDescription").exists().isString().trim().notEmpty();
export const contentPostValidation = body("content").exists().isString().trim().notEmpty();
export const blogIdPostValidation = body("blogId").exists().isString().trim().notEmpty().custom((value) => {
  const existingBlog = db.blogs.find(b=>b.id===value);
  if(!existingBlog) throw new Error()   // throw прочитать
  return true                                                                       
});
export const blogNamePostValidation = body("blogName").isString().trim().notEmpty().isLength({max: 15});




export const errorValidationMiddleware = (req: Request, res: Response, next:NextFunction) => {           
    const errors = validationResult(req).formatWith((error: any) =>({
          message: error.msg,
          field: error.path
    }))
 
    if(!errors.isEmpty()){
      const errArr = errors.array({onlyFirstError: true})

      return res.status(httpStatusCodes.BAD_REQUEST_400).json({errorsMesages: errArr})       
    }
    else 
    {
      return next()
    }
  }
    