import { Router } from "express";
import { Request, Response } from "express";
import { errorsMessages, httpStatusCodes } from "../http-status-codes/http-status-codes";

import { blogIdPostValidation, contentPostValidation, errorValidationMiddleware, idPostValidation, shortDescriptionPostValidation, titlePostValidation } from "../Validation/postValidation";
import {body, validationResult} from "express-validator";
import { TCreatePostInputModels, TUpdatePostInputModels } from "../models/BlogsPostsmodels";
import { postsRepositories } from "../repositories/dbPostRep";
import { authGuardMiddleware } from "../autorization/autorizationmidleware";

export const postsRoute = Router ({})  



  
postsRoute.get('/posts', (req: Request, res: Response) => {
    res.send(postsRepositories.getPosts()).sendStatus(httpStatusCodes.OK_200)                   //res.send(httpStatusCodes.OK_200).send(dbVideos) выдает ошибку попробую по другому
  })
  
postsRoute.get('/:id', (res: Response, req: Request) => {
  let foundPost = postsRepositories.getPostsId(req.params.id);
  if (foundPost) {
        res.send(foundPost).sendStatus(httpStatusCodes.OK_200)
      } else {
        res.sendStatus(404)
      }
  })
postsRoute.post('/posts', 
  authGuardMiddleware,
  titlePostValidation,
  shortDescriptionPostValidation,
  contentPostValidation,
  blogIdPostValidation,
  errorValidationMiddleware,                  
(req: Request, res: Response) => { 
 const title = req.body.title
 const shortDescription = req.body.shortDescription
 const content = req.body.content
 const blogId = req.body.blogId
 const blogName = req.body.blogName

const createdPost = postsRepositories.createPosts({title, shortDescription, content, blogId, blogName})
  res.status(httpStatusCodes.CREATED_201).send(createdPost)
})
   
    
  
postsRoute.put('/posts/:id', 
  authGuardMiddleware,
  titlePostValidation,
  shortDescriptionPostValidation,
  contentPostValidation,
  blogIdPostValidation,
  errorValidationMiddleware, 
(req: Request, res: Response) => { 
  const updatedPostModel: TUpdatePostInputModels = {   // исправить как в блоге
  id: req.params.id,
  title: req.body.title,
  shortDescription: req.body.shortDescription,
  content: req.body.shortDescription,
  blogId: req.body.shortDescription
   } 
   const updatedPost: Boolean = postsRepositories.updatePost(updatedPostModel)  
  if (!updatedPost) {
   return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
  }
  res.sendStatus(httpStatusCodes.NO_CONTEND_204)                                      
  return   })

postsRoute.delete('/:id', (res: Response, req: Request) => {
    let isDeleted: boolean = postsRepositories.deletePost(req.params.id);
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
      
    })
  