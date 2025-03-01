/*
  Warnings:

  - You are about to drop the column `owner_id` on the `condominiums` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "condominiums" DROP CONSTRAINT "condominiums_owner_id_fkey";

-- AlterTable
ALTER TABLE "condominiums" DROP COLUMN "owner_id";
