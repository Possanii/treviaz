/*
  Warnings:

  - A unique constraint covering the columns `[email,condominium_id]` on the table `invites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invites_email_condominium_id_key" ON "invites"("email", "condominium_id");

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
