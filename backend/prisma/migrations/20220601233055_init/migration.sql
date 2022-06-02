-- CreateTable
CREATE TABLE `accounts` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `hash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `accounts_firstname_lastname_key`(`firstname`, `lastname`),
    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stations` (
    `stationId` INTEGER NOT NULL AUTO_INCREMENT,
    `stationName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stations_stationName_key`(`stationName`),
    PRIMARY KEY (`stationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts_stations` (
    `accountId` INTEGER NOT NULL,
    `stationId` INTEGER NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `accounts_stations_accountId_stationId_key`(`accountId`, `stationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `vehicleId` INTEGER NOT NULL AUTO_INCREMENT,
    `stationId` INTEGER NOT NULL,
    `vehicleName` VARCHAR(191) NOT NULL,
    `registration` VARCHAR(191) NOT NULL,
    `producer` VARCHAR(191) NOT NULL,
    `trademark` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `productionDate` DATETIME(3) NOT NULL,
    `VIN` VARCHAR(191) NOT NULL,
    `operationalNumber` VARCHAR(191) NULL,
    `fuelType` ENUM('AVGAS', 'AVTUR', 'KEROSENE', 'SOLAR_OIL', 'DIESEL_OIL', 'FUEL_OIL', 'BIODIESEL', 'GASOLINE') NOT NULL DEFAULT 'GASOLINE',
    `fuelCapacity` DOUBLE NULL,
    `waterCapacity` DOUBLE NULL,
    `nextInspectionDate` DATETIME(3) NOT NULL,
    `CNBOP` VARCHAR(191) NULL,
    `nextInsuranceTerm` DATETIME(3) NOT NULL,
    `policyNumber` VARCHAR(191) NULL,
    `additionalInfo` VARCHAR(191) NULL,
    `comments` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vehicles_registration_key`(`registration`),
    UNIQUE INDEX `vehicles_VIN_key`(`VIN`),
    UNIQUE INDEX `vehicles_stationId_vehicleName_key`(`stationId`, `vehicleName`),
    PRIMARY KEY (`vehicleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles_equipments` (
    `stationId` INTEGER NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `equipmentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vehicles_equipments_stationId_vehicleId_equipmentId_key`(`stationId`, `vehicleId`, `equipmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipments` (
    `equipmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `stationId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `trademark` VARCHAR(191) NOT NULL,
    `productionDate` DATETIME(3) NOT NULL,
    `fuelType` ENUM('AVGAS', 'AVTUR', 'KEROSENE', 'SOLAR_OIL', 'DIESEL_OIL', 'FUEL_OIL', 'BIODIESEL', 'GASOLINE') NOT NULL DEFAULT 'GASOLINE',
    `technicalExamination` DATETIME(3) NOT NULL,
    `CNBOP` VARCHAR(191) NULL,
    `additionalInfo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`equipmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `firefighters` (
    `firefighter_id` INTEGER NOT NULL AUTO_INCREMENT,
    `stationId` INTEGER NOT NULL,
    `type` ENUM('CASUAL', 'SUPPORTING', 'YOUNG', 'HONORABLE') NOT NULL DEFAULT 'CASUAL',
    `registrationNumber` VARCHAR(191) NULL,
    `shortname` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NULL,
    `secondName` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `sex` ENUM('MAN', 'WOMAN') NOT NULL DEFAULT 'MAN',
    `birthDate` DATETIME(3) NULL,
    `birthPlace` VARCHAR(191) NULL,
    `fatherName` VARCHAR(191) NULL,
    `pesel` VARCHAR(191) NULL,
    `documentNumber` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `street` VARCHAR(191) NULL,
    `postalCode` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `phone2` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `bankAccount` VARCHAR(191) NULL,
    `drivingLicense` BOOLEAN NOT NULL,
    `additionalInfo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `firefighters_stationId_shortname_key`(`stationId`, `shortname`),
    PRIMARY KEY (`firefighter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `firefighters_courses` (
    `stationId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `firefighter_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `firefighters_courses_stationId_courseId_firefighter_id_key`(`stationId`, `courseId`, `firefighter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `courseId` INTEGER NOT NULL AUTO_INCREMENT,
    `stationId` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `courses_stationId_courseName_key`(`stationId`, `courseName`),
    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts_stations` ADD CONSTRAINT `accounts_stations_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts_stations` ADD CONSTRAINT `accounts_stations_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `stations`(`stationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `stations`(`stationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles_equipments` ADD CONSTRAINT `vehicles_equipments_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `stations`(`stationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles_equipments` ADD CONSTRAINT `vehicles_equipments_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`vehicleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles_equipments` ADD CONSTRAINT `vehicles_equipments_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `equipments`(`equipmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipments` ADD CONSTRAINT `equipments_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `stations`(`stationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `firefighters` ADD CONSTRAINT `firefighters_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `stations`(`stationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `firefighters_courses` ADD CONSTRAINT `firefighters_courses_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `stations`(`stationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `firefighters_courses` ADD CONSTRAINT `firefighters_courses_firefighter_id_fkey` FOREIGN KEY (`firefighter_id`) REFERENCES `firefighters`(`firefighter_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `firefighters_courses` ADD CONSTRAINT `firefighters_courses_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `stations`(`stationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
