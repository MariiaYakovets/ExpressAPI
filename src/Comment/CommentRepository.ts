import client from "../prisma/client"
import {Prisma, Comment } from '@prisma/client'


export async function getAll(): Promise<Comment[] | null| string> {
    try{
        const comments = await client.comment.findMany()
        if (comments.length == 0){
            return ('Comments not found')
        }
        return  comments
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return ('Failed to retrieve the comment.');
      } else {
        return ('An unexpected error occurred.');
      }
    }
}

export async function getById(id: number): Promise<Comment | null | string> {
    try{
        const comment = await client.comment.findUnique({
            where: {id: id}
        })
        if (!comment){
            return ('Comment not found')
        }
        return  comment
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return ('Failed to retrieve the comment.');
      } else {
        return ('An unexpected error occurred.');
      }
    }
}

export async function create(data: Prisma.CommentCreateInput): Promise<Comment | null | string> {
    try{
        const comment = await client.comment.create({
            data: data
        })
        return  comment
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

export async function deleteBy(id: number): Promise<Comment | null | string> {
    try{
        const comment = await client.comment.delete({
            where: {
                id: id
            }
        })
        return  comment
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                // Record not found
                return ('#User not found, cannot delete.');
            } else{
                return (err.code)
                }
      } else {
        return ('#An unexpected error occurred.');
      }
        
    }
}

export async function getByUser(userId: number): Promise<Comment[] | null | string> {
    try{
        const comments = await client.comment.findMany({
            where: {
                authorId: userId
            }
        })
        return  comments
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                // Record not found
                return ('#Comment not found');
            } else{
                return (err.code)
                }
      } else {
        return ('#An unexpected error occurred.');
      }
        
    }
}

export async function getToPostByUser(userId: number, postId: number): Promise<Comment[] | null | string> {
    try{
        const comments = await client.comment.findMany({
            where: {
                authorId: userId,
                postId: postId
            }
        })
       
        return  comments
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                // Record not found
                return ('#Comment not found');
            } else{
                return (err.code)
                }
      } else {
        return ('#An unexpected error occurred.');
      }
        
    }
}
export async function getAllToPost(postId: number): Promise<Comment[] | null | string> {
    try{
        const comments = await client.comment.findMany({
            include: {
                author: true
            },
            where: {
                postId: postId
            }
        })
        return  comments
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                // Record not found
                return ('#Comment not found');
            } else{
                return (err.code)
                }
      } else {
        return ('#An unexpected error occurred.');
      }
        
    }
}

