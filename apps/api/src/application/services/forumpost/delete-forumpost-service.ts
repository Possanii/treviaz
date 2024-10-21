import { PrismaClient } from '@prisma/client'
import { IForumPost } from '@/application/schemas/IForumPost'
import { NotFoundError } from '@/application/errors/not-found-error'

const prisma = new PrismaClient()

export class DeleteForumPostService {
    async execute(postId: string, userId: string): Promise<IForumPost> {
        const post = await prisma.forumPost.findUnique({
            where: { id: postId },
        })

        if (!post) {
            throw new NotFoundError('forumPost', 'Post not found')
        }

        if (post.user_id !== userId) {
            throw new Error('User is not authorized to delete this post')
        }

        await prisma.forumPost.delete({
            where: { id: postId },
        })

        return post
    }
}
