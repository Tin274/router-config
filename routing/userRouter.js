import { Router } from "express";
import { getAllUser, createSingleUser, getOneUser,updateOneUser,deleteOneUser } from '../controller/controller.js';

const userRouter = Router();

userRouter
.route('/users')
.get(getAllUser)
.post(createSingleUser)

userRouter
.route("/users/:id")
.get(getOneUser)
.put(updateOneUser)
.delete(deleteOneUser)

export default userRouter