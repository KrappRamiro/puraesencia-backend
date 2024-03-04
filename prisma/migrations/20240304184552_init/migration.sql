-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professional" (
    "id" TEXT NOT NULL,
    "cuit" TEXT NOT NULL,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professional_Payment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "professionalId" TEXT NOT NULL,

    CONSTRAINT "Professional_Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professional_Payment_Method" (
    "id" TEXT NOT NULL,
    "amount" MONEY NOT NULL,
    "paymentId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,

    CONSTRAINT "Professional_Payment_Method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "cuit" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit_Product" (
    "id" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Visit_Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit_Product_Payment" (
    "id" TEXT NOT NULL,
    "amount" MONEY NOT NULL,
    "visitId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "visitProductId" TEXT NOT NULL,

    CONSTRAINT "Visit_Product_Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Professional_Payment" ADD CONSTRAINT "Professional_Payment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professional_Payment_Method" ADD CONSTRAINT "Professional_Payment_Method_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Professional_Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professional_Payment_Method" ADD CONSTRAINT "Professional_Payment_Method_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Product" ADD CONSTRAINT "Visit_Product_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Product" ADD CONSTRAINT "Visit_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Product_Payment" ADD CONSTRAINT "Visit_Product_Payment_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Product_Payment" ADD CONSTRAINT "Visit_Product_Payment_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit_Product_Payment" ADD CONSTRAINT "Visit_Product_Payment_visitProductId_fkey" FOREIGN KEY ("visitProductId") REFERENCES "Visit_Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
