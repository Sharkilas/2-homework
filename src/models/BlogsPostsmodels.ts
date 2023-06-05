export type TCreatePostInputModels =
{
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  }
 
 export type TUpdatePostInputModels =
  {
      id: string,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      }
  export type TPostDbModels =
      {
       id: string,
       title: string,
       shortDescription: string,
       content: string,
       blogId: string,
       blogName: string
    }
    export type TPostViewModels =
    {
     id: string,
     title: string,
     shortDescription: string,
     content: string,
     blogId: string,
     blogName: string
  }


export type PostsModelsResponses =
{
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  }
  export type PostsModelsRequest =
  {
      id: string,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      blogName: string
    }
  

  export type BlogssModelsRequest =
{
  name: string,
  description: string,
  websiteUrl: string
  
  }
  export type BlogsModelsResponses =
{
  id: string,
  name: string,
  description: string,
  websiteUrl: string
    }
//export const qualityCheck = (arr: string [], arr2: string []) => {
//    return arr.every((res: string) => arr2.includes(res))
//}


export type TCreateBlogInputModel = {
  name: string,
  description: string,
  websiteUrl: string
}

export type TUpdateBlogInputModel = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string
}

export type TBlogDbModel = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string
}

export type TBlogViewModel = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string
}