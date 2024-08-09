import cors from 'cors';
import dotenv from 'dotenv';
// configurations
dotenv.config();
import express, { Application, Request, Response } from 'express';
import AppRoutes from './api/routes';
import { errorMiddleware } from './api/middlewares/error-middleware';
import { requestMiddleware } from './api/middlewares/request-logger';
async function startServer() {
// Boot express
const app: Application = express();
const port = process.env.PORT || 3000;
const base: string = process.env.base_url ?? '/api/';

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestMiddleware);
// Application routing
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'HI there' });
});
app.use(base, AppRoutes);
// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
app.use(errorMiddleware);
// Handle unhandled promise rejections and exceptions
process.on('unhandledRejection', (err: any) => {
  console.log(err);
});

process.on('uncaughtException', (err: any) => {
  console.log(err.message);
});
}
startServer();
