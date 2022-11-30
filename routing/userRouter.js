import { Router } from "express";
import { getAllUser, createSingleUser, getOneUser,updateOneUser,deleteOneUser } from '../controller/controller.js';

const userRouter = Router();

import {body} from 'express-validator';

userRouter
.route('/users')
.get(getAllUser)
.post(body('firstname').isLength({min: 1}), body('lastname').isLength({min: 1}), createSingleUser)

userRouter
.route("/users/:id")
.get(getOneUser)
.put(body('firstname').isLength({min: 1}), body('lastname').isLength({min: 1}), updateOneUser)
.delete(deleteOneUser)

export default userRouter