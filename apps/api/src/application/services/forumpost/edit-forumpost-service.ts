import { PrismaClient } from '@prisma/client'
import { IForumPost } from '@/application/schemas/IForumPost'
import { NotFoundError } from '@/application/errors/not-found-error'

const prisma = new PrismaClient()

export class EditForumPostService {
    async execute(postId: string, userId: string, content: string): Promise<IForumPost> {
        const post = await prisma.forumPost.findUnique({
            where: { id: postId },
        })

        if (!post) {
            throw new NotFoundError('forumPost', 'Post not found')
        }

        if (post.user_id !== userId) {
            throw new Error('User is not authorized to edit this post')
        }

        const updatedPost = await prisma.forumPost.update({
            where: { id: postId },
            data: { content },
        })

        return {
            id: updatedPost.id,
            content: updatedPost.content,
            created_at: updatedPost.created_at,
            updated_at: updatedPost.updated_at,
            thread_id: updatedPost.thread_id,
            user_id: updatedPost.user_id,
        }
    }
}
