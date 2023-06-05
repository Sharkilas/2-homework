import { Router } from "express"
import { errorsMessages, httpStatusCodes } from "../http-status-codes/http-status-codes";
import { blogsRepositories } from "../repositories/dbBlogRep"
import { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import {descriptionBlogValidation, nameBlogValidation, websiteBlogUrlValidation} from "../Validation/blogValidation"; //
import { errorValidationMiddleware } from "../Validation/postValidation";
import { TUpdateBlogInputModel } from "../models/BlogsPostsmodels";
import { authGuardMiddleware } from "../autorization/autorizationmidleware";



export const blogsRoute = Router ({})  



blogsRoute.get('/', (req: Request, res: Response) => {
      res.send(blogsRepositories.getBlogs()).sendStatus(httpStatusCodes.OK_200)
 })

blogsRoute.get('/:id', (res: Response, req: Request) => {
    let foundBlogs = blogsRepositories.getBlogById(req.params.id);
    if (foundBlogs) {
        res.send(foundBlogs ).sendStatus(httpStatusCodes.OK_200)
      } else {
        res.sendStatus(404)
      }
      
    })
                                                             //const foundBlogs = blogsRepositories.findBlog(req.query.name?.toISOString());

blogsRoute.post('/', 
authGuardMiddleware,
nameBlogValidation,
descriptionBlogValidation,
websiteBlogUrlValidation,
errorValidationMiddleware,
(req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  const websiteUrl = req.body.websiteUrl
  const createdBlog = blogsRepositories.createBlog({name, description, websiteUrl})
    res.status(httpStatusCodes.CREATED_201).send(createdBlog)
})
      
    
blogsRoute.put('/:id', 
authGuardMiddleware,
nameBlogValidation,
descriptionBlogValidation,
websiteBlogUrlValidation,
errorValidationMiddleware,
(req: Request, res: Response) => {
  const updateBlogModel: TUpdateBlogInputModel = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl
  }
  const updatedBlogs: Boolean = blogsRepositories.updateBlog(updateBlogModel) 
    
  if (!updatedBlogs) {
   return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
  }
  res.sendStatus(httpStatusCodes.NO_CONTEND_204)                                      
  return   })

  blogsRoute.delete('/:id', (res: Response, req: Request) => {
    let isDeleted: boolean = blogsRepositories.deleteBlog(req.params.id);
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
      
    })


