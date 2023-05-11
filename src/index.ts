import express, {Response, Request} from 'express';
import { httpStatusCodes } from './http-status-codes/http-status-codes';
import { VideosModels } from './models/Videomodels';
const app = express()
const port = 3003
type dbVideos = Array<VideosModels> 
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
type availableResolutions = Array<string>                                                          // как задать значенеи enum

const dbVideos =[
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
]


const jsonMiddleWare = express.json();                              // не совсем понял предназначение этой строки
app.use(jsonMiddleWare);




const currentDate = new Date();
const tomorrowDate = (date: Date, days: number) => {
  const result = new Date(date);
   result.setDate(result.getDate() + days);
   return result;
}



app.delete('/testing/all-data', (req: Request, res: Response) => {
  
    res.sendStatus(httpStatusCodes.NO_CONTEND_204)
  }
)



app.get('/videos', (req: Request, res: Response) => {
  res.sendStatus(httpStatusCodes.OK_200).send(dbVideos)
})

app.post('/videos', (req: Request, res: Response) => {
  res.send(dbVideos)
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
    minAgeRestriction:	req.body.minAgeRestriction,           // если поставить currentDate.toISOString() то возникает ошибка
    publicationDate:	req.body.publicationDate,              // если поставить tomorrowDate.toISOSstring то возникает ошибка                         
    createdAt: req.body.createdAt
  }
  dbVideos.push(UpdateVideosModels);                                        
                 
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
  minAgeRestriction:	req.body.minAgeRestriction,           // если поставить currentDate.toISOString() то возникает ошибка
  publicationDate:	req.body.publicationDate,              // если поставить tomorrowDate.toISOSstring то возникает ошибка                                                      
  createdAt: req.body.createdAt
}

dbVideos.push(UpdateVideosModels); 
}
})
   
                  

app.get('/videos/id', (req: Request, res: Response) => {
  let video = dbVideos.find(p=>p.id === +req.params.id)
  if (video) {
    res.send(httpStatusCodes.OK_200).send(video)
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
