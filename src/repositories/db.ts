import { BlogsModelsResponses, BlogssModelsRequest, PostsModelsResponses, TBlogDbModel, TBlogViewModel, TCreateBlogInputModel, TPostDbModels, TUpdateBlogInputModel} from "../models/BlogsPostsmodels"
import { Request, Response } from "express";
import { getRandomId } from "../Helper/Helper";



export const db: {blogs: TBlogDbModel[], posts: TPostDbModels[]} ={blogs: [
  {id: "1",
  name: "string1",
  description: "string1",
  websiteUrl: "string1"},
  
  {
  id: "string2",
  name: "string2",
  description: "string2",
  websiteUrl: "string2"
  }], 
  posts: [
    {
      id: "string1",
      title: "string1",
      shortDescription: "string1",
      content: "string1",
      blogId: "string1",
      blogName: "string1"
    },
    {
      id: "string2",
      title: "string2",
      shortDescription: "string2",
      content: "string2",
      blogId: "string2",
      blogName: "string2"
    }
  ]}
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
export const postsRepositories = {
  getPosts() {
    return db.posts
  }, 
  getPostsId(id: string ) {
    return db.posts.find(p=>p.id===id)
  },
  createPosts(res: Response, req: Request) {                        // пришлось прописывать типы (res: Response, req: Request) по другому выдавал ошибку
  const newPost: PostsModelsResponses = {
    id: getRandomId(),
    title: req.body.title,
    shortDescription: req.body.string,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: req.body.blogName
  } 
  db.posts.push(newPost)
  return newPost  
 },
 updatePost ({id, shortDescription, content, blogId}:PostsModelsResponses) {                  
  let filterPosts =  db.posts.find(p=>p.id===id)
  if (filterPosts) {
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