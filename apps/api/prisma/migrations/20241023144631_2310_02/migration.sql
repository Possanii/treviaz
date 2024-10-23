/*
  Warnings:

  - A unique constraint covering the columns `[document_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document_number` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "document_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_document_number_key" ON "users"("document_number");
