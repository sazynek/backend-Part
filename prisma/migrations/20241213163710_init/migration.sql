/*
  Warnings:

  - You are about to drop the column `supportComment` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `statistic` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `statistic` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `statistic` table. All the data in the column will be lost.
  - You are about to drop the column `supportComment` on the `statistic` table. All the data in the column will be lost.
  - Changed the type of `productCategories` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `praise_status` on the `praise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `famous` on the `status_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnumProductCategories" AS ENUM ('chicken', 'chicken_with_vegetables');

-- CreateEnum
CREATE TYPE "EnumPraiseStatus" AS ENUM ('premium', 'base');

-- CreateEnum
CREATE TYPE "EnumStatus" AS ENUM ('Healthy', 'Trending', 'Supreme');

-- DropIndex
DROP INDEX "statistic_email_key";

-- DropIndex
DROP INDEX "statistic_password_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "supportComment",
DROP COLUMN "productCategories",
ADD COLUMN     "productCategories" "EnumProductCategories" NOT NULL;

-- AlterTable
ALTER TABLE "praise" DROP COLUMN "praise_status",
ADD COLUMN     "praise_status" "EnumPraiseStatus" NOT NULL;

-- AlterTable
ALTER TABLE "statistic" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "supportComment";

-- AlterTable
ALTER TABLE "status_products" DROP COLUMN "famous",
ADD COLUMN     "famous" "EnumStatus" NOT NULL;

-- CreateTable
CREATE TABLE "_ArticlesToStatistic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArticlesToStatistic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProductsToStatistic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductsToStatistic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_StatisticToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StatisticToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArticlesToStatistic_B_index" ON "_ArticlesToStatistic"("B");

-- CreateIndex
CREATE INDEX "_ProductsToStatistic_B_index" ON "_ProductsToStatistic"("B");

-- CreateIndex
CREATE INDEX "_StatisticToUser_B_index" ON "_StatisticToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "categories_productCategories_key" ON "categories"("productCategories");
