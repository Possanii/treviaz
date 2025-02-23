/*
  Warnings:

  - You are about to drop the column `slug` on the `condominiums` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[keycloak_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `keycloak_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "condominiums_slug_key";

-- AlterTable
ALTER TABLE "condominiums" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "keycloak_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_keycloak_id_key" ON "users"("keycloak_id");
