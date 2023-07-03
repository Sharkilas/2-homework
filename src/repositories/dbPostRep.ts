import { BlogsModelsResponses, BlogssModelsRequest, PostsModelsResponses, TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TCreatePostInputModels, TPostDbModels, TPostViewModels, TUpdateBlogInputModel, TUpdatePostInputModels} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { getRandomId } from "../Helper/Helper";
import { db } from "./db";

export const postsRepositories = {
  getPosts() {
    return db.posts
  }, 
  getPostsId(id: string ) {
    return db.posts.find(p=>p.id===id)
  },
  createPosts({title, shortDescription, content, blogId}: TCreatePostInputModels) :TPostViewModels {                        // пришлось прописывать типы (res: Response, req: Request) по другому выдавал ошибку
  const blog = db.blogs.find(b => b.id === blogId)
    const newPost: TPostDbModels = {
    id: getRandomId(),
    title: title,
    shortDescription: shortDescription,
    content: content,
    blogId: blogId,
    blogName: blog!.name
  } 
  db.posts.push(newPost)
  return newPost  
 },
 updatePost ({id, shortDescription, content, title, blogId}:TUpdatePostInputModels) {                  
  let filterPosts =  db.posts.find(p=>p.id===id)
  if (filterPosts) {
    filterPosts.title = title
    filterPosts.shortDescription = shortDescription;                       
    filterPosts.content = content;
    filterPosts.blogId = blogId

    return true
    }
    else {return false}
 },
 deletePost(id: string) {
  const postIndex = db.posts.findIndex(item => item.id === id)
  if(postIndex === -1)
  return false
  db.blogs.splice(postIndex, 1)
  return true
} 
}