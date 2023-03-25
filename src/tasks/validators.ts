import { body, ValidationChain } from 'express-validator';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('Title must be in a text format'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description must be in a text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .trim()
    .isString()
    .withMessage('Date must be in a valid format'),

  body('priority')
    .trim()
    .isIn([Priority.low, Priority.high, Priority.normal])
    .withMessage(
      'Priority must be either high, low or normal',
    ),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status must be either todo, in progress or completed',
    ),
];
export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The id is mandatory')
    .trim()
    .isString()
    .withMessage('Title must be a valid uuid format'),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status must be either todo, in progress or completed',
    ),
];
