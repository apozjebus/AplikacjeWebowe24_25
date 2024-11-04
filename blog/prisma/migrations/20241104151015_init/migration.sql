-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tytul` VARCHAR(191) NOT NULL,
    `tresc` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `kategoriaId` INTEGER NOT NULL,
    `zdjecie` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tresc` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `wpisId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_kategoriaId_fkey` FOREIGN KEY (`kategoriaId`) REFERENCES `Kategorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_wpisId_fkey` FOREIGN KEY (`wpisId`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
