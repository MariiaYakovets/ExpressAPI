import {Prisma, User } from '@prisma/client'
import {getAll, getById, deleteBy, registerUser, loginUser} from './UserRepository'
import {sign} from 'jsonwebtoken';
import bcrypt, { compare, hash } from 'bcryptjs'
import { JWT_SECRET } from '../config/config';



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

// export async function createUserService(data: Prisma.UserCreateInput): Promise<User | null | string> {
//     const user = await create(data)
//     return user
// }

export async function deleteUserService(id : number): Promise<User | null | string> {
    if (+id){
        const user = await deleteBy(+id)
        return user
    } else{
        return ("No such id")
    }
}

export async function registerUserService(data: Prisma.UserCreateInput): Promise<{token?: string, message: string}> {
    if (!data.email){
        return {message: 'No email was provided'}
    }
    if (!data.password){
        return {message: 'No paswsword was provided'}
    }

    // зашифровка введенного пароля и для дальнейшей отправки в бд
    const hashedPassword = await hash(data.password, 10)
    data.password = hashedPassword
    const user = await registerUser(data)
    // проверка на наличие вернутого юзера
    if (!user){
        return {message: 'User was not registered'}
    }
    // если в юзера вернулась строчка (ошибки) из репозитория
    if (typeof user == 'string'){
        return {message: user}
    }
    // создание токена для сессии
    const token = sign({username: user.name}, JWT_SECRET, {expiresIn: '1h'})
    return {token: token, message: 'success'}
}
    
export async function userLoginService(email: string, password: string): Promise<{token?: string, message: string}> {
    const loggedUser = await loginUser(email)
    if (!loggedUser){
        return ({ message: 'No user was found'})
    }
    if (typeof loggedUser == 'string'){
        return({message: loggedUser})
    }
    const hashedPassword = loggedUser.password
    const isPasswordValid = await compare(password, hashedPassword)

    if (!isPasswordValid){
        return ({ message: 'Invalid password'}) 
    }
    const token = sign({username: loggedUser.name}, JWT_SECRET, {expiresIn: '1h'})
    return {token: token, message: 'success'}
}




    

    
