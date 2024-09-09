import {Prisma, Post } from '@prisma/client'
import {getAll, getById, create, deleteBy, getPostsByUser} from './PostRepository'

export async function getPostsService(): Promise<Post[] | null | string>  {
    const posts = await getAll()
    return posts
}

export async function getPostService(id: number): Promise<Post | null | string> {
    if (+id){
        const post = await getById(+id)
        return post
     } else{
        return ("No such id")
    }
}

export async function createPostService(data: Prisma.PostCreateInput): Promise<Post | null | string> {
    const post = await create(data)
    return post
}

export async function deletePostService(id : number): Promise<Post | null | string> {
    if (+id){
        const post = await deleteBy(+id)
        return post
    } else{
        return ("No such id")
    }
}
    
export async function getPostsByUserService(id : number): Promise<Post[] | null | string> {
    if (+id){
        const posts = await getPostsByUser(+id)
        return posts
    } else{
        return ("No such id")
    }
}
    
