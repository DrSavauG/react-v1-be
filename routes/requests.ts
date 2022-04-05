import * as asyncHandler from 'express-async-handler';
import { Router, Request, Response } from 'express';

import {
  jsonStreamStringify,
  getSome,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} from '../services/functions';

const userController = require('../controllers/user-controller');
const { body } = require('express-validator');
const api = Router();
/////
api.post('/registration',userController.registration);
// api.post('/login',userController.login);
// api.post('/logout',userController.logout);
api.get('/activate/:link',userController.activate);
// api.post('/refresh',userController.refresh);
// api.get('/users',userController.getUsers);
//
// api.post('/registration',
//   body('email').isEmail(),
//   body('password').isLength({ min: 3, max: 32 }),
//   userController.registration,
// );
//
//
api.get(
  '/users',
  asyncHandler(async (req: Request, res: Response) => {
    res.type('json');
    return jsonStreamStringify({isActivated:false}).pipe(res);
  }),
);
// //////////////
// api.get(
//   '/',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { page, limit, all } = req.query;
//     if (all) {
//       res.type('json');
//       return jsonStreamStringify({}).pipe(res);
//     }
//     if (page) {
//       res.send(await getSome(+page, +limit));
//     } else {
//       res.type('json');
//       return jsonStreamStringify({ _deletedAt: null }).pipe(res);
//     }
//   })
// );
//
// api.get(
//   '/:id',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     res.send(await getItemById(id));
//   })
// );
//
// api.post(
//   '/',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { title, body = false } = req.body;
//     if (!title) {
//       return res.sendStatus(418);
//     }
//     const outcome = await createItem(req.body);
//     res.json(outcome._id);
//   })
// );
//
// api.put(
//   '/:id',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { title, body } = req.body;
//     await updateItem({ id, title, body });
//     res.sendStatus(200);
//   })
// );
//
// api.patch(
//   '/:id',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { title, body } = req.body;
//     await updateItem({ id, title, body });
//     res.sendStatus(200);
//   })
// );
//
// api.delete(
//   '/:id',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { id } = req.params;
//
//     await deleteItem(id);
//
//     res.sendStatus(200);
//   })
// );

export default api;
