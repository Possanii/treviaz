/*
  Warnings:

  - You are about to drop the `ILeisureArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leisureArea" DROP CONSTRAINT "leisureArea_condominiumId_fkey";

-- DropForeignKey
ALTER TABLE "reserves" DROP CONSTRAINT "reserves_leisureAreaId_fkey";

-- DropTable
DROP TABLE "leisureArea";

-- CreateTable
CREATE TABLE "leisure_area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condominiumId" TEXT NOT NULL,

    CONSTRAINT "leisure_area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leisure_area" ADD CONSTRAINT "leisure_area_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserves" ADD CONSTRAINT "reserves_leisureAreaId_fkey" FOREIGN KEY ("leisureAreaId") REFERENCES "leisure_area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
