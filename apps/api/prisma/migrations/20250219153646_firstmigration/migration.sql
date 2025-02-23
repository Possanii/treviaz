/*
  Warnings:

  - Changed the type of `paymentMethod` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('CREDIT_CARD', 'BOLETO', 'PIX');

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethods" NOT NULL;
