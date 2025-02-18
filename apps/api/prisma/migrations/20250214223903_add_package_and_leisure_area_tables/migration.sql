/*
  Warnings:

  - You are about to drop the column `condominium_id` on the `reserves` table. All the data in the column will be lost.
  - You are about to drop the column `space_name` on the `reserves` table. All the data in the column will be lost.
  - Added the required column `leisureAreaId` to the `reserves` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reserves" DROP CONSTRAINT "reserves_condominium_id_fkey";

-- DropIndex
DROP INDEX "financial_categories_name_type_key";

-- AlterTable
ALTER TABLE "reserves" DROP COLUMN "condominium_id",
DROP COLUMN "space_name",
ADD COLUMN     "leisureAreaId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_units" (
    "userId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LeisureArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condominiumId" TEXT NOT NULL,

    CONSTRAINT "LeisureArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "recived_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivered_at" TIMESTAMP(3),
    "unitId" TEXT NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_units_userId_unitId_key" ON "user_units"("userId", "unitId");

-- AddForeignKey
ALTER TABLE "user_units" ADD CONSTRAINT "user_units_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_units" ADD CONSTRAINT "user_units_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeisureArea" ADD CONSTRAINT "LeisureArea_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserves" ADD CONSTRAINT "reserves_leisureAreaId_fkey" FOREIGN KEY ("leisureAreaId") REFERENCES "LeisureArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
