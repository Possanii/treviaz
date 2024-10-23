/*
  Warnings:

  - You are about to drop the column `password_hashed` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hashed";

-- CreateIndex
CREATE UNIQUE INDEX "users_document_number_key" ON "users"("document_number");
