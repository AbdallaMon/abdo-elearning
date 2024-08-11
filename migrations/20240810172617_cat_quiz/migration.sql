/*
  Warnings:

  - Added the required column `correct` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `choice` ADD COLUMN `correct` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `questionTextBestAnswer` VARCHAR(191) NULL,
    MODIFY `questionType` ENUM('TEXT', 'MULTIPLE_CHOICE', 'SECTION', 'TRUE_FALSE') NOT NULL;

-- AlterTable
ALTER TABLE `quiz` ADD COLUMN `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
