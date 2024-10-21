/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `forum_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "forum_categories_name_key" ON "forum_categories"("name");
