import  userService from '../services/user-service';
import * as asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { jsonStreamStringify } from '../services/functions';
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
  async getUsers(req,res,next){
   res.json([123,1231]);
  }
  async activate(req,res,next){

  }


}


module.exports = new UserController();
