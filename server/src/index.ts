import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import socketIoService from "./services/SocketIoService";
import { createServer } from "http";
import config from "./config/config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server Nodemon 2 3 4");
});

let server;
server = createServer(app).listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

socketIoService.init(server);
