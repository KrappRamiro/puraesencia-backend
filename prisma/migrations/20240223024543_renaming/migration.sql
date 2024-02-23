/*
  Warnings:

  - You are about to drop the column `visitsId` on the `Visit_Payments` table. All the data in the column will be lost.
  - You are about to drop the column `servicesId` on the `Visit_Services` table. All the data in the column will be lost.
  - You are about to drop the column `visitsId` on the `Visit_Services` table. All the data in the column will be lost.
  - Added the required column `visitId` to the `Visit_Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Visit_Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitId` to the `Visit_Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Visit_Payments" DROP CONSTRAINT "Visit_Payments_visitsId_fkey";

-- DropForeignKey
ALTER TABLE "Visit_Services" DROP CONSTRAINT "Visit_Services_servicesId_fkey";

-- DropForeignKey
ALTER TABLE "Visit_Services" DROP CONSTRAINT "Visit_Services_visitsId_fkey";

-- AlterTable
ALTER TABLE "Visit_Payments" DROP COLUMN "visitsId",
ADD COLUMN     "visitId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Visit_Services" DROP COLUMN "servicesId",
DROP COLUMN "visitsId",
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "visitId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit_Services" ADD CONSTRAINT "Visit_Services_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Services" ADD CONSTRAINT "Visit_Services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Payments" ADD CONSTRAINT "Visit_Payments_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
