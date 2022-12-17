CREATE SCHEMA IF NOT EXISTS `tin-projekt-parulski-s17427`;
-- Table: "Employee"
CREATE TABLE IF NOT EXISTS `tin-projekt-parulski-s17427`.`Employee`
(	`IdEmployee` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    `Name` VARCHAR(50)  NOT NULL,
    `SecondName` VARCHAR(50)  NULL,
    `Surname` VARCHAR(100) NOT NULL,
 	PRIMARY KEY (`IdEmployee`),
 	UNIQUE INDEX `employee_id_UNIQUE` (`IdEmployee` ASC)
 ) ENGINE = INNODB CHARSET=utf8 COLLATE utf8_general_ci;
-- Table: Reason
CREATE TABLE IF NOT EXISTS `tin-projekt-parulski-s17427`.`Reason`
(   `IdReason` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    `Name` VARCHAR(50) NOT NULL,
    `SalaryPercentage` DECIMAL(3,2)  NOT NULL,
   	PRIMARY KEY (`IdReason`),
 	UNIQUE INDEX `reason_id_UNIQUE` (`IdReason` ASC)
 ) ENGINE = INNODB CHARSET=utf8 COLLATE utf8_general_ci;
-- Table: Absence
CREATE TABLE IF NOT EXISTS `tin-projekt-parulski-s17427`.`Absence`
(   `IdAbsence` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    `IdEmployee` INT UNSIGNED NOT NULL,
    `IdReason` INT UNSIGNED NOT NULL,
    `DateFrom` Date  NOT NULL,
    `DateTo` Date  NOT NULL,
    `IsAccepted` TINYINT  NOT NULL,
   	PRIMARY KEY (`IdAbsence`),
 	UNIQUE INDEX `absence_id_UNIQUE` (`IdAbsence` ASC),
 	CONSTRAINT `employee_fk` FOREIGN KEY (`IdEmployee`) REFERENCES `tin-projekt-parulski-s17427`.`Employee` (`IdEmployee`),
 	CONSTRAINT `reason_fk` FOREIGN KEY (`IdReason`) REFERENCES `tin-projekt-parulski-s17427`.`Reason` (`IdReason`)
 ) ENGINE = INNODB CHARSET=utf8 COLLATE utf8_general_ci;
-- insert base data to tables
INSERT IGNORE INTO `tin-projekt-parulski-s17427`.`Employee` (`IdEmployee`, `Name`, `SecondName`, `Surname` ) VALUES
(1, 'Jan', 'Andrzej', 'Kowalski'),
(2, 'Andrzej', 'Jan', 'Niekowalski'),
(3, 'Michał', null, 'Testowy'),
(4, 'Kazimierz', null, 'Tetmajer'),
(5, 'Janina', 'Anna', 'Bąk')
;
INSERT IGNORE INTO `tin-projekt-parulski-s17427`.`Reason` (`IdReason`, `Name`, `SalaryPercentage`) VALUES
(1, 'Urlop', 1.00),
(2, 'Zwolnienie lekarskie', 0.80)
;
INSERT IGNORE INTO `tin-projekt-parulski-s17427`.`Absence` (`IdAbsence`, `IdEmployee`, `IdReason`, `DateFrom`, `DateTo`, `IsAccepted`) VALUES
(1, 1, 2, '2022-09-05', '2022-09-09', TRUE),
(2, 1, 1, '2022-10-10', '2022-10-14', TRUE),
(3, 5, 1, '2022-10-31', '2022-11-05', FALSE)
;