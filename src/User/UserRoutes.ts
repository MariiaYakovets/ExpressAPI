import {Router} from "express"
import { getAllUsers, getUser, deleteUser, userRegister, userLogin } from './UserController'
const userRouter = Router()

userRouter.get('/all', getAllUsers)
userRouter.get('/:id', getUser)
// userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)
userRouter.post('/api/register', userRegister)
userRouter.post('/api/login', userLogin)

export = userRouter