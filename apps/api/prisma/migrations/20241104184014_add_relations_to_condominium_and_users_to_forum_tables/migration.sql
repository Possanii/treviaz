/*
  Warnings:

  - You are about to drop the column `category_id` on the `forum_threads` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `forum_threads` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[condominium_id,slug]` on the table `forum_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[related_to_category_id,slug]` on the table `forum_threads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `condominium_id` to the `forum_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_user_id` to the `forum_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `forum_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approved_by_user_id` to the `forum_threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_user_id` to the `forum_threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `related_to_category_id` to the `forum_threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `forum_threads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "forum_threads" DROP CONSTRAINT "forum_threads_category_id_fkey";

-- DropForeignKey
ALTER TABLE "forum_threads" DROP CONSTRAINT "forum_threads_user_id_fkey";

-- DropIndex
DROP INDEX "forum_categories_name_key";

-- AlterTable
ALTER TABLE "forum_categories" ADD COLUMN     "condominium_id" TEXT NOT NULL,
ADD COLUMN     "created_by_user_id" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "forum_threads" DROP COLUMN "category_id",
DROP COLUMN "user_id",
ADD COLUMN     "approved_by_user_id" TEXT NOT NULL,
ADD COLUMN     "created_by_user_id" TEXT NOT NULL,
ADD COLUMN     "related_to_category_id" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "forum_categories_condominium_id_slug_key" ON "forum_categories"("condominium_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "forum_threads_related_to_category_id_slug_key" ON "forum_threads"("related_to_category_id", "slug");

-- AddForeignKey
ALTER TABLE "forum_categories" ADD CONSTRAINT "forum_categories_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_categories" ADD CONSTRAINT "forum_categories_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_threads" ADD CONSTRAINT "forum_threads_related_to_category_id_fkey" FOREIGN KEY ("related_to_category_id") REFERENCES "forum_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_threads" ADD CONSTRAINT "forum_threads_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_threads" ADD CONSTRAINT "forum_threads_approved_by_user_id_fkey" FOREIGN KEY ("approved_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
