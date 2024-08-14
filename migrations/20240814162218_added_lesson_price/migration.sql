/*
  Warnings:

  - You are about to drop the column `status` on the `studentcourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lessonpurchase` ADD COLUMN `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `studentcourse` DROP COLUMN `status`;
