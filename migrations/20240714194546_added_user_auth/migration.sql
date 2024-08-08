/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[confirmationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `confirmationExpires` DATETIME(3) NULL,
    ADD COLUMN `confirmationToken` VARCHAR(191) NULL,
    ADD COLUMN `resetPasswordExpires` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_resetPasswordToken_key` ON `User`(`resetPasswordToken`);

-- CreateIndex
CREATE UNIQUE INDEX `User_confirmationToken_key` ON `User`(`confirmationToken`);
