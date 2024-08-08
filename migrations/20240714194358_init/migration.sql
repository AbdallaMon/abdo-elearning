/*
  Warnings:

  - You are about to drop the column `prerequisiteId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_prerequisiteId_fkey`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `prerequisiteId`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `bio`,
    DROP COLUMN `status`;
