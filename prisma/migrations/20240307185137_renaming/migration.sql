/*
  Warnings:

  - Added the required column `name` to the `Professional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professional" ADD COLUMN     "name" TEXT NOT NULL;
