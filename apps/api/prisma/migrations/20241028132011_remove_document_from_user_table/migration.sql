/*
  Warnings:

  - You are about to drop the column `document_number` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_document_number_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "document_number";
