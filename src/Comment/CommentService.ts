import {Prisma, Comment } from '@prisma/client'
import {getAll, getById, create, deleteBy, getByUser, getToPostByUser, getAllToPost} from './CommentRepository'

export async function getCommentsService(): Promise<Comment[] | null | string>  {
    const comments = await getAll()
    return comments
}

export async function getCommentService(id: number): Promise<Comment | null | string> {
    if (+id){
        const comment = await getById(+id)
        return comment
     } else{
        return ("No such id")
    }
}

export async function createCommentService(data: Prisma.CommentCreateInput): Promise<Comment | null | string> {
    const comment = await create(data)
    return comment
}

export async function deleteCommentService(id : number): Promise<Comment | null | string> {
    if (+id){
        const comment = await deleteBy(+id)
        return comment
    } else{
        return ("No such id")
    }
}
    
export async function getCommentsByUserService(userId : number): Promise<Comment[] | null | string> {
    if (+userId){
        const comments = await getByUser(+userId)
        return comments
    } else{
        return ("No such id")
    }
}
    
    
export async function getCommentsToPostByUserService(postId : number, userId : number): Promise<Comment[] | null | string> {
    if (+postId && +userId){
        const comments = await getToPostByUser(+postId, +userId)
        return comments
    } else{
        return ("No such ids")
    }
}
    
    
export async function getAllCommentsToPostService(postId : number): Promise<Comment[] | null | string> {
    if (+postId){
        const comments = await getAllToPost(+postId)
        return comments
    } else{
        return ("No such ids")
    }
}
    
