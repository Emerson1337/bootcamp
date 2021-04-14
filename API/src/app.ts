import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import Routes from './routes/router';
import './database' //importando a conexão com o banco de dados.
import AppError from './errors/AppErrors';

const app = express()

app.use(express.json());
app.use(cors());
app.use(Routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!',
  })
})

export default app;
