/*
  Warnings:

  - Added the required column `order` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lesson` ADD COLUMN `order` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `studentcourse` ADD COLUMN `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';
