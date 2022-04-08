// import * as asyncHandler from 'express-async-handler';
import { Router } from 'express';
const authMiddleware = require('../middlewares/auth-middleware');

const userController = require('../controllers/user-controller');
const { body } = require('express-validator');
const api = Router();
api.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.registration);

api.get('/activate/:link',userController.activate);
api.post('/login', userController.login);
api.post('/logout', userController.logout);
api.get('/users', authMiddleware, userController.getUsers);
api.get('/refresh', userController.refresh);
api.get('/films',userController.getFilms);
api.post('/films',userController.addFilm)







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
//
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
