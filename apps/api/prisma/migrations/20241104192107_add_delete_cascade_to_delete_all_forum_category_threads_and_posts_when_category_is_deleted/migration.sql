-- DropForeignKey
ALTER TABLE "forum_posts" DROP CONSTRAINT "forum_posts_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "forum_threads" DROP CONSTRAINT "forum_threads_related_to_category_id_fkey";

-- AddForeignKey
ALTER TABLE "forum_threads" ADD CONSTRAINT "forum_threads_related_to_category_id_fkey" FOREIGN KEY ("related_to_category_id") REFERENCES "forum_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "forum_threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
