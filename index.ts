import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Task } from './src/tasks/entity';
import { taskRoutes } from './src/tasks/routes';

const app: Express = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('Datasource has been initialized');
  })
  .catch((err) =>
    console.log(
      'Error during datasource initialization',
      err,
    ),
  );

// ROUTES
app.use('/', taskRoutes);
