import { Prisma, Post } from "@prisma/client";
import {
	getAll,
	getById,
	create,
	deleteBy,
	getPostsByUser,
} from "./PostRepository";
import { failure, Result, success } from "../core/result";

export async function getPostsService(): Promise<Result<Post[], string>> {
	const posts = await getAll();
	return posts;
}

export async function getPostService(
	id: number
): Promise<Result<Post, string>> {
	if (!id) {
		return failure("Id was not provided");
	}
	const post = await getById(id);
	return post;
}

export async function createPostService(
	data: Prisma.PostCreateInput
): Promise<Result<Post, string>> {
	const post = await create(data);
	return post;
}

export async function deletePostService(
	id: number
): Promise<Result<Post, string>> {
	if (!id) {
		return failure("Id was not provided");
	}
	const post = await deleteBy(id);
	return post;
}

export async function getPostsByUserService(
	id: number
): Promise<Result<Post[], string>> {
	if (!id) {
		return failure("Id was not provided");
	}
	const posts = await getPostsByUser(+id);
	return posts;
}
