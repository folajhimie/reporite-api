import http from 'http';
// import express, { Application } from 'express';
import { createHttpTerminator } from 'http-terminator';
import express, { Application, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './src/database/connect';
import './src/exceptions/process';
// import applicationSetting from "./src/app"
import app from './src/app';

// import app from './src/app';


dotenv.config();

// const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
  server,
});


app.use(express.json());
// applicationSetting.use(applicationSetting);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



const start = async () => {
  try {
    await dbConnect();
    console.log('DB connected successfully...')
    server.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Connection to MongoBD Database has failed", error.message);
      process.exit(1);
    }
  }
}




start();


// import router from './src/routes';
// import './src/process';

// const app: Application = express();
// const port = process.env.PORT || 3000;

// app.use(router);

// server.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });




