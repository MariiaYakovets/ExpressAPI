import { Response, Request } from "express";
import {
	getCommentsService,
	getCommentService,
	createCommentService,
	deleteCommentService,
	getCommentsByUserService,
	getCommentsToPostByUserService,
    getAllCommentsToPostService
} from "./CommentService";

export async function getAllComments(req: Request, res: Response) {
	const comments = await getCommentsService();
	res.json(comments);
}

export async function getComment(req: Request, res: Response) {
	const { id } = req.params;
	const comment = await getCommentService(id ? +id : 1);
	res.json(comment);
}

export async function createComment(req: Request, res: Response) {
	const commentData = req.body;
	const comment = await createCommentService(commentData);
	res.json(comment);
}

export async function deleteComment(req: Request, res: Response) {
	const { id } = req.params;
	const comment = await deleteCommentService(id ? +id : 1);
	res.json(comment);
}

export async function getCommentsByUser(req: Request, res: Response) {
	const { id: userId } = req.params;
	const comments = await getCommentsByUserService(userId ? +userId : 1);
	res.json(comments);
}

export async function getCommentsToPostByUser(req: Request, res: Response) {
	const { id: postId } = req.params;
	const { userId: userId } = req.params;
	const comments = await getCommentsToPostByUserService(
		postId ? +postId : 1,
		userId ? +userId : 1
	);
	res.json(comments);
}

export async function getAllToPost(req: Request, res: Response) {
	const { id: postId } = req.params;
	const comments = await getAllCommentsToPostService(
		postId ? +postId : 1,
	);
	res.json(comments);
}
