import express, {Response, Request} from 'express';
import { httpStatusCodes } from './http-status-codes/http-status-codes';
import { dbavailableResolutions, VideosModels } from './models/Videomodels';
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
                                    
  if(!req.body.availableResolutions || !Array.isArray(req.body.availableResolutions)|| !dbavailableResolutions.includes(req.body.availableResolutions) === false ){
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
  let canBeDownloaded =req.body.canBeDownloaded;                                        
  if(!canBeDownloaded || typeof canBeDownloaded !== 'boolean'){
  errors.push({
                           message: "canBeDownloaded",
                           field: "canBeDownloaded"
                     })}
 let minAgeRestriction = req.body.minAgeRestriction;                                        
 if(!minAgeRestriction || typeof minAgeRestriction !== 'number' || minAgeRestriction < 1 || minAgeRestriction >18){  
 errors.push({message: "incorrect minAgeRestriction",
             field: "minAgeRestriction"
                                     })}
if(!req.body.availableResolutions || !Array.isArray(req.body.availableResolutions)||dbavailableResolutions.includes(req.body.availableResolutions) === false ){
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
    minAgeRestriction:	req.body.minAgeRestriction,         
    publicationDate:	tommorowDate.toISOString(),                                       
    createdAt: currentDate.toISOString(),
  }
  db.videos.push(newVideo); 
  res.status(httpStatusCodes.NO_CONTEND_204).send(newVideo)                                       
  return });


   
                  

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
