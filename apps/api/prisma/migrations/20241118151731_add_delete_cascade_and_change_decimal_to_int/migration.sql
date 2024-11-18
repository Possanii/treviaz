/*
  Warnings:

  - You are about to alter the column `amount` on the `financial_transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `totalAmount` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `amountPaid` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "condominiums" DROP CONSTRAINT "condominiums_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "user_condominiums" DROP CONSTRAINT "user_condominiums_condominium_id_fkey";

-- DropForeignKey
ALTER TABLE "user_condominiums" DROP CONSTRAINT "user_condominiums_user_id_fkey";

-- AlterTable
ALTER TABLE "financial_transactions" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "amountPaid" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "condominiums" ADD CONSTRAINT "condominiums_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_condominiums" ADD CONSTRAINT "user_condominiums_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_condominiums" ADD CONSTRAINT "user_condominiums_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "condominiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
