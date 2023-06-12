import bodyParser from 'body-parser';
import express, {Response, Request, NextFunction} from 'express';
import { httpStatusCodes } from './http-status-codes/http-status-codes';

import { blogsRoute } from './routes/blogs-routes';
import { postsRoute } from './routes/posts-routers';
import { BodyParser } from 'body-parser';
import { db } from './repositories/db';
const app = express()
const port = 3003



app.use(bodyParser());                        
app.use(express.json());
app.use ('/posts', postsRoute);
app.use ('/blogs', blogsRoute);





app.get('/', (req: Request, res: Response) => {
  res.send('Доброе утро!!')
})    

app.delete ('/testing/all-data', (req: Request, res: Response) => {
  db.posts = [];
  db.blogs = []
  res.sendStatus(204) 
})
  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
