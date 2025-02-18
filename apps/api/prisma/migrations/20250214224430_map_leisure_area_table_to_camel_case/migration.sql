/*
  Warnings:

  - You are about to drop the `LeisureArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeisureArea" DROP CONSTRAINT "LeisureArea_condominiumId_fkey";

-- DropForeignKey
ALTER TABLE "reserves" DROP CONSTRAINT "reserves_leisureAreaId_fkey";

-- DropTable
DROP TABLE "LeisureArea";

-- CreateTable
CREATE TABLE "leisureArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condominiumId" TEXT NOT NULL,

    CONSTRAINT "leisureArea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leisureArea" ADD CONSTRAINT "leisureArea_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserves" ADD CONSTRAINT "reserves_leisureAreaId_fkey" FOREIGN KEY ("leisureAreaId") REFERENCES "leisureArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
