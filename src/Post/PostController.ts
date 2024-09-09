import {Response, Request} from "express"
import { getPostsService, 
    getPostService,
    createPostService, 
    deletePostService,
    getPostsByUserService } from './PostService'


export async function getAllPosts(req: Request, res: Response) {
    const posts = await getPostsService()
    res.json(posts)

}

export async function getPost(req: Request, res: Response) {
    const {id} = req.params
    const post = await getPostService(id? +id: 1)
    res.json(post)
}

export async function createPost(req: Request, res: Response) {
    const postData = req.body
    const post = await createPostService(postData)
    res.json(post)
}

export async function deletePost(req: Request, res: Response) {
    const {id}= req.params 
    const post = await deletePostService(id? +id: 1)
    res.json(post)

}
export async function getPostsByUser(req: Request, res: Response) {
    const {id}= req.params 
    const posts = await getPostsByUserService(id? +id: 1)
    res.json(posts)

}
