import { TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TUpdateBlogInputModel} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { getRandomId } from "../Helper/Helper";
import { db } from "./db";

  export const blogsRepositories = {
  getBlogs() {
    return db.blogs
  },
  getBlogById(id: string) {
     return db.blogs.find(p=>p.id===id)
     },

  updateBlog(updateBlogModel: TUpdateBlogInputModel): boolean {
    let filterBlogs =  db.blogs.find(b=>b.id=== updateBlogModel.id)
    if (filterBlogs) {
      filterBlogs.name = updateBlogModel.name;                       
      filterBlogs.description = updateBlogModel.description;
      filterBlogs.websiteUrl = updateBlogModel.websiteUrl

      return true
      }
      else {
        return false}

  },

  createBlog({name, description, websiteUrl}: TCreateBlogInputModel): TBlogViewModel {                   
    const newBlog: TBlogDbModel = {
      id:	getRandomId(),
      name:	name,
      description:	description,
      websiteUrl: websiteUrl, 
  }
    db.blogs.push(newBlog); 
    return newBlog      

}, 
  deleteBlog(id: string) {
    const blogIndex = db.blogs.findIndex(item => item.id === id)
    if(blogIndex === -1)
    return false
    db.blogs.splice(blogIndex, 1)
    return true
  }
}
