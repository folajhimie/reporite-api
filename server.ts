import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './src/database/connect';

dotenv.config();

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const start = async() => {
  try{
      await dbConnect();
      console.log('DB connected successfully...')
      app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
      });
  }catch(error){
      if (error instanceof Error) {
        console.log("Connection to MongoBD Database has failed", error.message);
        process.exit(1);
      }
  }
}


start();





