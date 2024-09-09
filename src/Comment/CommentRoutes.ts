import {Router} from "express"
import { getAllComments, 
    getComment, 
    createComment, 
    deleteComment, 
    getCommentsByUser, 
    getCommentsToPostByUser,
    getAllToPost } from './CommentController'
const commentRouter = Router()

commentRouter.get('/all', getAllComments)
commentRouter.get('/:id', getComment)
commentRouter.post('/', createComment)
commentRouter.delete('/:id', deleteComment)
commentRouter.get('/commentsByUser/:id', getCommentsByUser)
commentRouter.get('/commentsToPostByUser/:id/:userId', getCommentsToPostByUser)
commentRouter.get('/allToPost/:id', getAllToPost)


export = commentRouter