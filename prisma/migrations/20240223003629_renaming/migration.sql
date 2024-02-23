/*
  Warnings:

  - You are about to drop the `ProfessionalPayment_PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visits_Payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visits_Services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalPayment_PaymentMethod" DROP CONSTRAINT "ProfessionalPayment_PaymentMethod_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalPayment_PaymentMethod" DROP CONSTRAINT "ProfessionalPayment_PaymentMethod_professionalPaymentsId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Visits" DROP CONSTRAINT "Visits_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Visits_Payments" DROP CONSTRAINT "Visits_Payments_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "Visits_Payments" DROP CONSTRAINT "Visits_Payments_visitsId_fkey";

-- DropForeignKey
ALTER TABLE "Visits_Services" DROP CONSTRAINT "Visits_Services_servicesId_fkey";

-- DropForeignKey
ALTER TABLE "Visits_Services" DROP CONSTRAINT "Visits_Services_visitsId_fkey";

-- DropTable
DROP TABLE "ProfessionalPayment_PaymentMethod";

-- DropTable
DROP TABLE "Services";

-- DropTable
DROP TABLE "Visits";

-- DropTable
DROP TABLE "Visits_Payments";

-- DropTable
DROP TABLE "Visits_Services";

-- CreateTable
CREATE TABLE "ProfessionalPayment_PaymentMethods" (
    "id" TEXT NOT NULL,
    "professionalPaymentsId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "amount" MONEY NOT NULL,

    CONSTRAINT "ProfessionalPayment_PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit_Services" (
    "id" TEXT NOT NULL,
    "visitsId" TEXT NOT NULL,
    "servicesId" TEXT NOT NULL,

    CONSTRAINT "Visit_Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit_Payments" (
    "id" TEXT NOT NULL,
    "visitsId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "amount" MONEY NOT NULL,

    CONSTRAINT "Visit_Payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalPayment_PaymentMethods" ADD CONSTRAINT "ProfessionalPayment_PaymentMethods_professionalPaymentsId_fkey" FOREIGN KEY ("professionalPaymentsId") REFERENCES "ProfessionalPayment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalPayment_PaymentMethods" ADD CONSTRAINT "ProfessionalPayment_PaymentMethods_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Services" ADD CONSTRAINT "Visit_Services_visitsId_fkey" FOREIGN KEY ("visitsId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Services" ADD CONSTRAINT "Visit_Services_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Payments" ADD CONSTRAINT "Visit_Payments_visitsId_fkey" FOREIGN KEY ("visitsId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Payments" ADD CONSTRAINT "Visit_Payments_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
