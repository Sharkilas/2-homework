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
  if (!validationResult(req).isEmpty()){
    const errorsResponse = validationResult(req).array({onlyFirstError: true}).map((error: any)=>{
      console.log(error);
      const err = error as FieldValidationError;
      
      return  {message: err.msg,
                 field: err.path}                                              
    })
    return res.status(httpStatusCodes.BAD_REQUEST_400).json({'errorsMesage': errorsResponse})       
  } else {
    return next()
  }
}