/*
  Warnings:

  - Added the required column `city` to the `stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `stations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stations` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `postalCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;
