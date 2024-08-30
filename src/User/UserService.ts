import {Prisma, User } from '@prisma/client'
import {getAll, getById, create, deleteBy} from './UserRepository'

export async function getUsersService(): Promise<User[] | null | string>  {
    const users = await getAll()
    return users
}

export async function getUserService(id: number): Promise<User | null | string> {
    if (+id){
        const user = await getById(+id)
        return user
     } else{
        return ("No such id")
    }
}

export async function createUserService(data: Prisma.UserCreateInput): Promise<User | null | string> {
    const user = await create(data)
    return user
}

export async function deleteUserService(id : number): Promise<User | null | string> {
    if (+id){
        const user = await deleteBy(+id)
        return user
    } else{
        return ("No such id")
    }
}
    
