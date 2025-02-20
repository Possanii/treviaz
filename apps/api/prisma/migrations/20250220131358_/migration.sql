/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `condominiums` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `units` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `condominiums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "condominiums" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "units" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "condominiums_slug_key" ON "condominiums"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "units_slug_key" ON "units"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");
