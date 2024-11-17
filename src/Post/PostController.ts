import {Response, Request} from "express"
import { getPostsService, 
    getPostService,
    createPostService, 
    deletePostService,
    getPostsByUserService } from './PostService'


export async function getAllPosts(req: Request, res: Response) {
    const data = await getPostsService()
    if (data.status == 'failure'){
        res.send(data.error)
    }else{
        res.json(data)
    }
    
}

export async function getPost(req: Request, res: Response) {
    const {id} = req.params
    const data = await getPostService(id? +id: 1)
    if (data.status == 'failure'){
        res.send(data.error)
    }else{
        res.json(data)
    }
}

export async function createPost(req: Request, res: Response) {
    const postData = req.body
    const data = await createPostService(postData)
    if (data.status == 'failure'){
        res.send(data.error)
    }else{
        res.json(data)
    }
}

export async function deletePost(req: Request, res: Response) {
    const {id}= req.params 
    const data = await deletePostService(id? +id: 1)
    if (data.status == 'failure'){
        res.send(data.error)
    }else{
        res.json(data)
    }

}
export async function getPostsByUser(req: Request, res: Response) {
    const {id}= req.params 
    const data = await getPostsByUserService(id? +id: 1)
    if (data.status == 'failure'){
        res.send(data.error)
    }else{
        res.json(data)
    }

}
