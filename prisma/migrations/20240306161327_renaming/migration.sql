/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Professional_Payment_Method` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PaymentMethod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Professional_Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Professional_Payment_Method` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Visit_Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Visit_Product_Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentPaymentId` to the `Professional_Payment_Method` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Professional_Payment_Method" DROP CONSTRAINT "Professional_Payment_Method_paymentId_fkey";

-- AlterTable
ALTER TABLE "Professional_Payment_Method" DROP COLUMN "paymentId",
ADD COLUMN     "parentPaymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_id_key" ON "PaymentMethod"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_id_key" ON "Professional"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_Payment_id_key" ON "Professional_Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_Payment_Method_id_key" ON "Professional_Payment_Method"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_id_key" ON "Visit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_Product_id_key" ON "Visit_Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_Product_Payment_id_key" ON "Visit_Product_Payment"("id");

-- AddForeignKey
ALTER TABLE "Professional_Payment_Method" ADD CONSTRAINT "Professional_Payment_Method_parentPaymentId_fkey" FOREIGN KEY ("parentPaymentId") REFERENCES "Professional_Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
