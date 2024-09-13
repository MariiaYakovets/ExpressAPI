import {Response, Request} from "express"
const jwt = require('jsonwebtoken');
import { getUsersService, 
    getUserService,
    deleteUserService,
    userLoginService, 
    registerUserService} from './UserService'


export async function getAllUsers(req: Request, res: Response) {
    const users = await getUsersService()
    res.json(users)

}

export async function getUser(req: Request, res: Response) {
    const {id} = req.params
    const user = await getUserService(id? +id: 1)
    res.json(user)
}

// export async function createUser(req: Request, res: Response) {
//     const userData = req.body
//     const user = await createUserService(userData)
//     res.json(user)
// }

export async function deleteUser(req: Request, res: Response) {
    const {id}= req.params 
    const user = await deleteUserService(id? +id: 1)
    res.json(user)

}

export async function userRegister(req: Request, res: Response) {
    const newUserData = req.body
    if (!newUserData.email || !newUserData.password) {
        return res.status(400).send('Username and password are required')
    }
    const user = await registerUserService(newUserData)
    // res.status(201).send('User registered successfully')
    res.json(user)
}

export async function userLogin(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email && !password){
        return res.status(400).send('Unvalid credentioals')
    }
    const data = await userLoginService(email, password)
    res.json(data)
}

