-- DropForeignKey
ALTER TABLE "forum_threads" DROP CONSTRAINT "forum_threads_approved_by_user_id_fkey";

-- AlterTable
ALTER TABLE "forum_threads" ALTER COLUMN "approved_by_user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "forum_threads" ADD CONSTRAINT "forum_threads_approved_by_user_id_fkey" FOREIGN KEY ("approved_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
