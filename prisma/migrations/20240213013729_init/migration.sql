-- CreateTable
CREATE TABLE "Professional" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalPayment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "professionalId" TEXT NOT NULL,

    CONSTRAINT "ProfessionalPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalPayment_PaymentMethod" (
    "id" TEXT NOT NULL,
    "professionalPaymentsId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "amount" MONEY NOT NULL,

    CONSTRAINT "ProfessionalPayment_PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "cuit" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visits" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visits_Services" (
    "id" TEXT NOT NULL,
    "visitsId" TEXT NOT NULL,
    "servicesId" TEXT NOT NULL,

    CONSTRAINT "Visits_Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visits_Payments" (
    "id" TEXT NOT NULL,
    "visitsId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "amount" MONEY NOT NULL,

    CONSTRAINT "Visits_Payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalPayment" ADD CONSTRAINT "ProfessionalPayment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalPayment_PaymentMethod" ADD CONSTRAINT "ProfessionalPayment_PaymentMethod_professionalPaymentsId_fkey" FOREIGN KEY ("professionalPaymentsId") REFERENCES "ProfessionalPayment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalPayment_PaymentMethod" ADD CONSTRAINT "ProfessionalPayment_PaymentMethod_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visits" ADD CONSTRAINT "Visits_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visits_Services" ADD CONSTRAINT "Visits_Services_visitsId_fkey" FOREIGN KEY ("visitsId") REFERENCES "Visits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visits_Services" ADD CONSTRAINT "Visits_Services_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visits_Payments" ADD CONSTRAINT "Visits_Payments_visitsId_fkey" FOREIGN KEY ("visitsId") REFERENCES "Visits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visits_Payments" ADD CONSTRAINT "Visits_Payments_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
