import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-error';
import cors from 'cors';
import routes from './routes';
import './database';
import fileConfig from './config/fileConfig';
import AppError from './error/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(fileConfig.directory));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    error: 'Internal Server Error',
  });
});
app.listen(3333, () => {
  console.log('Server started at :3333');
});
