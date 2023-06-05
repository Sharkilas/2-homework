import {body, validationResult} from "express-validator";
import { httpStatusCodes } from "../http-status-codes/http-status-codes";
import { Request, Response, NextFunction} from "express";


export const idBlogValidation = body("id").exists().isString().trim().notEmpty();
export const nameBlogValidation = body("name").exists().isString().trim().notEmpty().isLength({max: 15});
export const descriptionBlogValidation = body("description").exists().isString().trim().notEmpty().isLength({max: 500});
export const websiteBlogUrlValidation = body("websiteUrl").exists().isString().isURL().trim().notEmpty().isLength({max: 100}).matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'
)


//проверить в свагере 