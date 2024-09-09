import {Router} from "express"
import { getAllPosts, getPost, createPost, deletePost, getPostsByUser } from './PostController'
const postRouter = Router()

postRouter.get('/all', getAllPosts)
postRouter.get('/:id', getPost)
postRouter.post('/', createPost)
postRouter.delete('/:id', deletePost)
postRouter.get('/userposts/:id', getPostsByUser)


export = postRouter