/*
  Warnings:

  - Made the column `description` on table `forum_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "forum_categories" ALTER COLUMN "description" SET NOT NULL;
