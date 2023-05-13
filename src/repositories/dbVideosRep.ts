import { VideosModels } from "../models/Videomodels"

type dbVideos = Array<VideosModels> 
export const db: {videos: VideosModels[]} ={videos: [
    {id: 1,
    title:	"string-1",
    author:	"string-1",
    canBeDownloaded: false,
    minAgeRestriction:	 null,
    createdAt:	"2023-05-08T10:49:49.732Z",
    publicationDate:	'2023-05-09T10:49:49.732Z',
    availableResolutions: ['P144', 'P240']},
    
    {id: 2,
      title:	"string-2",
      author:	"string-2",
      canBeDownloaded: false,
      minAgeRestriction:	 null,
      createdAt:	"2023-05-08T10:49:49.732Z",
      publicationDate:	'2023-05-09T10:49:49.732Z',
      availableResolutions: ['P144', 'P360']},
  ]}