import express, {Response, Request} from 'express';
import { httpStatusCodes } from './http-status-codes/http-status-codes';
import { UpdateVideosModels } from './models/UpdateVideosModels';
import { dbavailableResolutions, qualityCheck, VideosModels } from './models/Videomodels';
import { db, } from './repositories/dbVideosRep';
const app = express()
const port = 3003

const jsonMiddleWare = express.json();                              
app.use(jsonMiddleWare);

const currentDate = new Date();
const incrementDate = (date: Date, days: number) => {
  const result = new Date(date);
   result.setDate(result.getDate() + days);
   return result;
}

const tommorowDate = incrementDate(currentDate, 1);



 app.delete("/testing/all-data", (req: Request, res: Response) => {
  
  db.videos = []
   res.sendStatus(204)               //send(httpStatusCodes.NO_CONTEND_204)
  }
)

app.get('/', (req: Request, res: Response) => {
  res.send('Доброе утро!')
})

app.get('/videos', (req: Request, res: Response) => {
  res.status(200).send(db.videos)                   //res.send(httpStatusCodes.OK_200).send(dbVideos) выдает ошибку попробую по другому
})

app.post('/videos', (req: Request, res: Response) => {
  const errors = []
  let title = req.body.title;                                        
  if(!title || typeof title !== 'string' || !title.trim() || title.length>40){  
errors.push({message: "incorrect title",
            field: "title"
            })}
  let author =req.body.author;                                        
  if(!author || typeof author !== 'string' || author.length>20){
  errors.push({
              message: "incorrect author",
              field: "author"
              })}
    let qualityVideos = req.body.availableResolutions;                                
  if(!qualityVideos || !Array.isArray(qualityVideos)|| !qualityCheck(qualityVideos, dbavailableResolutions)){
                    errors.push({
                      message: "incorrect availableResolutions",
                      field: "availableResolutions"
                    })}
  if(errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST_400).send({errorsMessages: errors})
  }
  const newVideo: VideosModels = {
    id:	+currentDate,
    title:	req.body.title,
    author:	req.body.author,
    availableResolutions: req.body.availableResolutions, 
    canBeDownloaded: req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
    minAgeRestriction:	null,         
    publicationDate:	tommorowDate.toISOString(),                                       
    createdAt: currentDate.toISOString(),
  }
  db.videos.push(newVideo); 
  res.status(httpStatusCodes.CREATED_201).send(newVideo)                                       
   return              
 });

app.put('/videos/:id', (req: Request, res: Response) => {
 
const video = db.videos.find(v=> v.id === +req.params.id)     
if (!video) {
 return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
}
const errors = []
let title = req.body.title;
let canBeDownloaded =req.body.canBeDownloaded;  
let publicationDate =req.body.publicationDate; 
let author =req.body.author; 
let minAgeRestriction = req.body.minAgeRestriction;
let qualityVideos = req.body.availableResolutions;

 
 if(!title || typeof title !== 'string' || !title.trim() || title.length>40){  
errors.push({message: "incorrect title",
              field: "title"
                  })}
                                         
  if(!author || typeof author !== 'string' || author.length>20){
  errors.push({
                      message: "incorrect author",
                      field: "author"
                    })}
                                        
  if(!canBeDownloaded || typeof canBeDownloaded !== 'boolean'){
  errors.push({
                           message: "incorrect canBeDownloaded",
                           field: "canBeDownloaded"
                     })}
                                      
 if(publicationDate && typeof publicationDate !== 'string'){
 errors.push({
                            message: "incorrect publicationDate",
                            field: "publicationDate"
                                        })}


                                         
 if(!minAgeRestriction || typeof minAgeRestriction !== 'number' || minAgeRestriction < 1 || minAgeRestriction >18){  
 errors.push({message: "incorrect minAgeRestriction",
             field: "minAgeRestriction"
                                     })}
                                 
 if(!qualityVideos || !Array.isArray(qualityVideos)|| !qualityCheck(qualityVideos, dbavailableResolutions)){
                    errors.push({
                      message: "incorrect availableResolutions",
                      field: "availableResolutions"
                    })}
  if(errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST_400).send({errorsMessages: errors})
  }
  if (title.length||canBeDownloaded.length||publicationDate.length||author.length||minAgeRestriction.length||qualityVideos.length === 0 )                                        
 {return res.sendStatus(httpStatusCodes.NO_CONTEND_204)}

    const newVideo: UpdateVideosModels = {
    title:	req.body.title,
    author:	req.body.author,
    availableResolutions: req.body.availableResolutions, 
    canBeDownloaded: req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
    minAgeRestriction:	null,         
    }
    const resultVideo = {
      ...video,...newVideo                                     // копирование свойств первого массива из свойств второго массива, не смог найти про это в документации
    }
  
    
  res.status(httpStatusCodes.CREATED_201).send(resultVideo)                                       
   return   
  })
   //  video.title =	req.body.title,                                через присваивание каждому эллементу 
   // video.author =	req.body.author,                       
   // video.availableResolutions = req.body.availableResolutions, 
   // video.canBeDownloaded = req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
   // video.minAgeRestriction =	req.body.minAgeRestriction,         
   // video.publicationDate =	tommorowDate.toISOString() || req.body.publicationDate,                                       
   
   
  //res.status(httpStatusCodes.CREATED_201)                                     
  //return });


   
                  

app.get('/videos/:id', (req: Request, res: Response) => {
  const videoId = db.videos.find(v=>v.id === +req.params.id)
  if (videoId) {
    res.send(videoId).sendStatus(httpStatusCodes.OK_200)
  } else {
    res.sendStatus(404)
  }
  
  
})

app.delete('/videos/:id', (req: Request, res: Response) => {
  const video = db.videos.find(v=>v.id === +req.params.id)
  if (video) {
    db.videos = db.videos.filter(v=> v.id !== video.id)               // dbVideos.filter(p=>p.id !== +req.params.id) - так не получилось
    res.sendStatus(httpStatusCodes.NO_CONTEND_204)
  }
  else res.sendStatus(httpStatusCodes.NOT_FOUND_404)
})

  


                    
  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
