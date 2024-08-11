-- DropForeignKey
ALTER TABLE `answer` DROP FOREIGN KEY `Answer_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `choice` DROP FOREIGN KEY `Choice_questionId_fkey`;

-- AlterTable
ALTER TABLE `answer` ADD COLUMN `sectionQuestionId` INTEGER NULL,
    MODIFY `questionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `choice` ADD COLUMN `sectionQuestionId` INTEGER NULL,
    MODIFY `questionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `media` MODIFY `type` ENUM('VIDEO', 'AUDIO', 'TEXT', 'IMAGE', 'PDF') NOT NULL;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `description` VARCHAR(191) NULL,
    MODIFY `questionType` ENUM('TEXT', 'MULTIPLE_CHOICE', 'SECTION') NOT NULL;

-- CreateTable
CREATE TABLE `SectionQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `parentQuestionId` INTEGER NOT NULL,
    `order` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SectionQuestion` ADD CONSTRAINT `SectionQuestion_parentQuestionId_fkey` FOREIGN KEY (`parentQuestionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_sectionQuestionId_fkey` FOREIGN KEY (`sectionQuestionId`) REFERENCES `SectionQuestion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_sectionQuestionId_fkey` FOREIGN KEY (`sectionQuestionId`) REFERENCES `SectionQuestion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
