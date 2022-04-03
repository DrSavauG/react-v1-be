import * as asyncHandler from 'express-async-handler';
import { Router, Request, Response } from 'express';

import {
  jsonStreamStringify,
  getSome,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../services/todofunc';

const api = Router();

api.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    if (page) {
      res.send(await getSome(+page, +limit));
    } else {
      res.type('json');
      return jsonStreamStringify().pipe(res);
    }
  })
);

api.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(await getTodoById(id));
  })
);

api.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { title, body = false } = req.body;
    if (!title) {
      return res.sendStatus(418);
    }
    await createTodo({ title, body });
    res.sendStatus(201);
  })
);

api.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, body } = req.body;
    await updateTodo({ id, title, body });
    res.sendStatus(200);
  })
);

api.patch(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, body } = req.body;
    await updateTodo({ id, title, body });
    res.sendStatus(200);
  })
);

api.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await deleteTodo(id);

    res.sendStatus(200);
  })
);

export default api;
