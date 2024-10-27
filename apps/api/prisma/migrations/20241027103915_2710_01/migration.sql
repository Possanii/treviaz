/*
  Warnings:

  - Added the required column `condominium_id` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "condominium_id" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
