import {Response, Request} from "express"
import { getUsersService, 
    getUserService,
    createUserService, 
    deleteUserService } from './UserService'


export async function getAllUsers(req: Request, res: Response) {
    const users = await getUsersService()
    res.json(users)

}

export async function getUser(req: Request, res: Response) {
    const {id} = req.params
    const user = await getUserService(id? +id: 1)
    res.json(user)
}

export async function createUser(req: Request, res: Response) {
    const userData = req.body
    const user = await createUserService(userData)
    res.json(user)
}

export async function deleteUser(req: Request, res: Response) {
    const {id}= req.params 
    const user = await deleteUserService(id? +id: 1)
    res.json(user)

}