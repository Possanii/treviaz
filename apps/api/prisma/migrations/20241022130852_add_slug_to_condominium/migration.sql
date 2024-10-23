/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `condominiums` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `condominiums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "condominiums" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "condominiums_slug_key" ON "condominiums"("slug");
