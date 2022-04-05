import  userService from '../services/user-service';
import * as asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { jsonStreamStringify } from '../services/functions';
import Schema from '../models/Schema';
import JsonStreamStringify from 'json-stream-stringify';
const { validationResult } = require('express-validator');
// const ApiError = require('../exceptions/api-error');

class UserController {
  async registration(req, res, next) {
    try {
      //
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      // }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      // next(e);
      console.log(e);
    }
  }
  // async getUsers(req,res,next){
  //   return Schema.find({ isActivated: true });
  // }
    // const { page, limit, active } = req.query;
    // if (active) {
    // }
//     if (page) {
//       res.send(await getSome(+page, +limit));
//     } else {
//       res.type('json');
//       return jsonStreamStringify({ _deletedAt: null }).pipe(res);
//     }
    async   activate(req, res, next) {
      try {
        const activationLink = req.params.link;
        console.log("activationLink",activationLink);
        await userService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL);
      } catch (e) {
        console.log(e);
      }

    }


}


module.exports = new UserController();
