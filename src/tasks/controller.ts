import { Task } from './entity';
import { AppDataSource } from '../../index';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

export class TaskController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];
    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      allTasks = instanceToPlain(allTasks) as Task[];
      return res.json(allTasks).status(200);
    } catch (errors) {
      return res
        .send({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.description = req.body.description;
    newTask.date = req.body.date;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      createdTask = instanceToPlain(createdTask) as Task;
      return res.json(createdTask).status(201);
    } catch (error) {
      return res
        .send({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      return res
        .send({ error: 'Internal Server Error' })
        .status(500);
    }
    if (!task) {
      return res
        .status(404)
        .json({ error: 'The task does not exist' });
    }

    let updatedTask: UpdateResult;
    try {
      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, {
          status: req.body.status,
        }),
      );

      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (e) {
      return res
        .send({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}

export const tasksController = new TaskController();
