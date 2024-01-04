// import express from 'express';
import express, { Application, Express, Request, Response } from 'express';
// import express, { Request, Response, NextFunction } from 'express';
// import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import { router as userRouter } from "./routes/People/userRoutes";
// import { router as authRouter } from "./routes/People/authRoutes";

import routes from './routes';
import path from 'path';
import { logger } from './middleware/Logger';

// const app = express();

const app: Application = express();

// const corsOptions = {
//     "origin": [
//         "http://127.0.0.1:7050",   
//         "http://localhost:4545", 
//         "https://reporite.netlify.app", 
//     ],
//     "methods": ["GET", "PUT", "POST", "PATCH", "DELETE"],
//     "allowedHeaders": ["Content-Type", "AgentId", "Accept"],
//     "exposedHeaders": ["Content-Type", "AgentId", "Accept"],
//     "credentials": true,
// }

const allowedOrigins = ["http://localhost:7050", "http://127.0.0.1:7050", "http://localhost:4545", "https://reporite.netlify.app", "*"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },

}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/auth", authRouter);

app.use("/", routes());

// Routes
app.get("/welcome", (req: Request, res: Response) => {
    res.send("Home Page");
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// This code snippet is a part of a Node.js application. It defines a route handler for all routes in the application using the app.all() method. The route handler is responsible for handling requests that do not match any other routes defined in the application.


// The app.all('*', ...) line specifies that this route handler will be executed for any HTTP method (*) and any route (*).
// Inside the route handler, it first sets the HTTP response status code to 404 using res.status(404). This indicates that the requested resource was not found.
// Next, it checks the Accept header of the request to determine the response format expected by the client.
// If the client accepts HTML, it sends an HTML file (404.html) as the response using res.sendFile().
// If the client accepts JSON, it sends a JSON object with a message property ({ message: '404 Not Found' }) using res.json().
// If the client does not specify any specific format or does not accept HTML or JSON, it sends a plain text response ('404 Not Found') using res.type().send().

app.all('*', (req: Request, res: Response) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

export default app;



// export { app }
