import express, {Response, Request} from 'express';
import { httpStatusCodes } from './http-status-codes/http-status-codes';
import { VideosModels } from './models/Videomodels';
import { dbVideos } from './repositories/dbVideosRep';
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
  dbVideos.splice(0, dbVideos.length)
   res.sendStatus(204)               //send(httpStatusCodes.NO_CONTEND_204)
  }
)

app.get('/', (req: Request, res: Response) => {
  res.send('Доброе утро!')
})

app.get('/videos', (req: Request, res: Response) => {
  res.send(dbVideos)                   //res.send(httpStatusCodes.OK_200).send(dbVideos) выдает ошибку попробую по другому
})

app.post('/videos', (req: Request, res: Response) => {
  
  let title =req.body.title;                                        // Как записать если нет и автора и тайтл
  if(!title || typeof title !== 'string' || title.length>40)
  res.status(httpStatusCodes.BAD_REQUEST_400).send({
                    errorMessage: [{
                      'message': "incorrect title",
                      "field": "tile"
                    }]}
                    );
  let author =req.body.author;                                        // Как записать если нет и автора и тайтл
  if(!author || typeof author !== 'string' || author.length>20)
  res.status(httpStatusCodes.BAD_REQUEST_400).send({
                    errorMessage: [{
                      'message': "incorrect author",
                      "field": "author"
                    }]}
                    )
  let availableResolutions =req.body.availableResolutions;                                        // Как записать если нет и автора и тайтл
  if(!availableResolutions || !Array.isArray(availableResolutions))
  res.status(httpStatusCodes.BAD_REQUEST_400).send({
                    errorMessage: [{
                      'message': "incorrect availableResolutions",
                      "field": "availableResolutions"
                    }]}
                    )
  let UpdateVideosModels = {
    id:	+currentDate,
    title:	req.body.title,
    author:	req.body.author,
    availableResolutions: req.body.availableResolutions, 
    canBeDownloaded: req.body.canBeDownloaded,
    minAgeRestriction:	req.body.minAgeRestriction,         
    publicationDate:	tommorowDate.toISOString(),                                       
    createdAt: currentDate.toISOString(),
  }
  dbVideos.push(UpdateVideosModels); 
  res.send(dbVideos)                                       
                 
 });
app.put('/videos/:id', (req: Request, res: Response) => {
 
let foundVideos =(dbVideos.find(v=> v.id === +req.params.id))                
if (!foundVideos) {
res.status(httpStatusCodes.BAD_REQUEST_400).send({
  errorMessage: [{
    'message': "video not found",
    "field": "canBeDownloaded"
  }]}
  );
}
let title = req.body.title
 if (!title || title.length > 40 || typeof title !== "string") {
 res.status(httpStatusCodes.BAD_REQUEST_400).send({
  errorMessage: [{
    'message': "incorrect title",
    "field": "tile"
  }]}
  );
 }
 let author =req.body.author;  
 if(!author || typeof author !== 'string' || author.length>20)                   
 res.status(httpStatusCodes.BAD_REQUEST_400).send({
                   errorMessage: [{
                     'message': "incorrect author",
                     "field": "author"
                   }]}
                   )
 let availableResolutions =req.body.availableResolutions;                                        // Как записать если нет и автора и тайтл
 if(!availableResolutions || !Array.isArray(availableResolutions)){
 res.status(httpStatusCodes.BAD_REQUEST_400).send({
                   errorMessage: [{
                     'message': "incorrect availableResolutions",
                     "field": "availableResolutions"
                   }]}
                   )}

 else {

                                                                 //foundVideos.title = req.body.title
res.json(foundVideos)
let UpdateVideosModels = {
  id:	+currentDate,
  title:	req.body.title,
  author:	req.body.author,
  availableResolutions: req.body.availableResolutions, 
  canBeDownloaded: req.body.canBeDownloaded,
  minAgeRestriction:	req.body.minAgeRestriction,           
  publicationDate:	tommorowDate.toISOString(),                                                                    
  createdAt: currentDate.toISOString()
}

dbVideos.push(UpdateVideosModels); 
}
})
   
                  

app.get('/videos/id', (req: Request, res: Response) => {
  let video = dbVideos.find(p=>p.id === +req.params.id)
  if (video) {
    res.send(video).send(httpStatusCodes.OK_200)
  }
  else {res.send(httpStatusCodes.NOT_FOUND_404)}
  
  
})

app.delete('/videos/:id', (req: Request, res: Response) => {
  let video = dbVideos.find(p=>p.id === +req.params.id)
  if (video) {
    dbVideos.filter(v=>v.id !== +req.params.id)
    res.send(httpStatusCodes.NO_CONTEND_204)
  }
  else res.send(httpStatusCodes.NOT_FOUND_404)
  
  res.send(dbVideos)
})

  


                    
  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
