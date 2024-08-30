import {Router} from "express"
import { getAllUsers, getUser, createUser, deleteUser } from './UserController'
const userRouter = Router()

userRouter.get('/all', getAllUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)


export = userRouter