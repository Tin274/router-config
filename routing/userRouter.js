import { Router } from "express";
import { getAllUser, createSingleUser, getOneUser,updateOneUser,deleteOneUser } from '../controller/controller.js';
import { checkUser, checkUserUpdate, checkUserId } from "../middleware/middleware.js";

const userRouter = Router();

import {body} from 'express-validator';

userRouter
.route('/users')
.get(getAllUser)
.post(body('firstname').isLength({min: 1}), body('lastname').isLength({min: 1}),checkUser, createSingleUser)

userRouter
.route("/users/:id")
.get(getOneUser)
.put(body('firstname').isLength({min: 1}), body('lastname').isLength({min: 1}),checkUserId,checkUser,checkUserUpdate, updateOneUser)
.delete(checkUserId, deleteOneUser)

export default userRouter