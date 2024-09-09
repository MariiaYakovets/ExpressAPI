import client from "../prisma/client"
import {Prisma, Post } from '@prisma/client'


export async function getAll(): Promise<Post[] | null| string> {
    try{
        const posts = await client.post.findMany()
        if (posts.length == 0){
            return ('Posts not found')
        }
        return  posts
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return ('Failed to retrieve the user.');
      } else {
        return ('An unexpected error occurred.');
      }
    }
}

export async function getById(id: number): Promise<Post | null | string> {
    try{
        const post = await client.post.findUnique({
            where: {id: id}
        })
        if (!post){
            return ('Post not found')
        }
        return  post
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return ('Failed to retrieve the user.');
      } else {
        return ('An unexpected error occurred.');
      }
    }
}

export async function create(data: Prisma.PostCreateInput): Promise<Post | null | string> {
    try{
        const post = await client.post.create({
            data: data
        })
        return  post
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

export async function deleteBy(id: number): Promise<Post | null | string> {
    try{
        const post = await client.post.delete({
            where: {
                id: id
            }
        })
        return  post
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

export async function getPostsByUser(id: number): Promise<Post[] | null | string> {
    try{
        const posts = await client.post.findMany({
            where: {
                authorId: id
            }
        })
        return posts
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

