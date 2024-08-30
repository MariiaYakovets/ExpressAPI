import client from "../prisma/client"
import {Prisma, User } from '@prisma/client'


export async function getAll(): Promise<User[] | null| string> {
    try{
        const users = await client.user.findMany()
        if (users.length == 0){
            return ('Users not found')
        }
        return  users
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return ('Failed to retrieve the user.');
      } else {
        return ('An unexpected error occurred.');
      }
    }
}

export async function getById(id: number): Promise<User | null | string> {
    try{
        const user = await client.user.findUnique({
            where: {id: id}
        })
        if (!user){
            return ('User not found')
        }
        return  user
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return ('Failed to retrieve the user.');
      } else {
        return ('An unexpected error occurred.');
      }
    }
}

export async function create(data: Prisma.UserCreateInput): Promise<User | null | string> {
    try{
        const user = await client.user.create({
            data: data
        })
        return  user
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                // Unique constraint failed
                return ('A user with this email already exists.');
            } else{
                return (err.code)
            }
        // Handle all other errors
        } else if (err instanceof Prisma.PrismaClientValidationError) {
            return ('Invalid data provided.');
        } else {
            return ('An unexpected error occurred.');
        }
    }
}

export async function deleteBy(id: number): Promise<User | null | string> {
    try{
        const user = await client.user.delete({
            where: {
                id: id
            }
        })
        return  user
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                // Record not found
                return ('User not found, cannot delete.');
            } else{
                return (err.code)
                }
      } else {
        return ('An unexpected error occurred.');
      }
        
    }
}

