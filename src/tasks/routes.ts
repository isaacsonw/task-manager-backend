import { Router } from 'express';
import { tasksController } from './controller';
import {
  createValidator,
  updateValidator,
} from './validators';

export const taskRoutes: Router = Router();

taskRoutes.get('/tasks', tasksController.getAll);
taskRoutes.post(
  '/tasks',
  createValidator,
  tasksController.create,
);
taskRoutes.put(
  '/tasks',
  updateValidator,
  tasksController.update,
);
