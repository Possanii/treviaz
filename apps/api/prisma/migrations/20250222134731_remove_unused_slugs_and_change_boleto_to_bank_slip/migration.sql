/*
  Warnings:

  - The values [BOLETO] on the enum `PaymentMethods` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `slug` on the `units` table. All the data in the column will be lost.
  - You are about to drop the `service_owners` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethods_new" AS ENUM ('CREDIT_CARD', 'BANK_SLIP', 'PIX');
ALTER TABLE "payments" ALTER COLUMN "paymentMethod" TYPE "PaymentMethods_new" USING ("paymentMethod"::text::"PaymentMethods_new");
ALTER TYPE "PaymentMethods" RENAME TO "PaymentMethods_old";
ALTER TYPE "PaymentMethods_new" RENAME TO "PaymentMethods";
DROP TYPE "PaymentMethods_old";
COMMIT;

-- DropIndex
DROP INDEX "units_slug_key";

-- AlterTable
ALTER TABLE "units" DROP COLUMN "slug";

-- DropTable
DROP TABLE "service_owners";
