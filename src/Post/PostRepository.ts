import { failure, Result, success } from "../core/result";
import client from "../prisma/client";
import { Prisma, Post } from "@prisma/client";

export async function getAll(): Promise<Result<Post[], string>> {
	try {
		const posts = await client.post.findMany();
		if (posts.length == 0) {
			return failure("Posts not found");
		}
		return success(posts);
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			return failure("Failed to retrieve the user.");
		} else {
			return failure("An unexpected error occurred.");
		}
	}
}

export async function getById(id: number): Promise<Result<Post, string>> {
	try {
		const post = await client.post.findUnique({
			where: { id: id },
		});
		if (!post) {
			return failure("Post not found");
		}
		return success(post);
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			return failure("Failed to retrieve the user.");
		} else {
			return failure("An unexpected error occurred.");
		}
	}
}

export async function create(
	data: Prisma.PostCreateInput
): Promise<Result<Post, string>> {
	try {
		const post = await client.post.create({
			data: data,
		});
		return success(post);
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				// Unique constraint failed
				return failure("A user with this email already exists.");
			} else {
				return failure(err.code);
			}
			// Handle all other errors
		} else if (err instanceof Prisma.PrismaClientValidationError) {
			return failure("Invalid data provided.");
		} else {
			return failure("An unexpected error occurred.");
		}
	}
}

export async function deleteBy(id: number): Promise<Result<Post, string>> {
	try {
		const post = await client.post.delete({
			where: {
				id: id,
			},
		});
		return success(post);
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2025") {
				// Record not found
				return failure("User not found, cannot delete.");
			} else {
				return failure(err.code);
			}
		} else {
			return failure("An unexpected error occurred.");
		}
	}
}

export async function getPostsByUser(
	id: number
): Promise<Result<Post[], string>> {
	try {
		const posts = await client.post.findMany({
			where: {
				authorId: id,
			},
		});
		return success(posts);
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2025") {
				// Record not found
				return failure("User not found, cannot delete.");
			} else {
				return failure(err.code);
			}
		} else {
			return failure("An unexpected error occurred.");
		}
	}
}
