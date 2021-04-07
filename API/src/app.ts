import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Routes from './routes/router';
import './database' //importando a conexão com o banco de dados.

const app = express()

app.use(express.json());
app.use(cors());
app.use(Routes);

export default app;
