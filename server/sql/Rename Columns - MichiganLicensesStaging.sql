ALTER TABLE `starthebar`.`michiganlicensesstaging` 
ADD COLUMN `MichiganLicensesStagingID` INT NOT NULL AUTO_INCREMENT FIRST,
CHANGE COLUMN `ï»¿LARA Business ID` `LARABusinessID` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Account Name` `AccountName` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `County: County` `County` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Current LGU: LGU Name` `CurrentLGU` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Issuing LGU: LGU Name` `IssuingLGU` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Group` `LicenseGroup` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Number` `LicenseNumber` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Type` `LicenseType` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Subtype` `LicenseSubtype` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Statute: Ownership Transferable` `StatuteOwnershipTransferable` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `Statute: Location Transferable` `StatuteLocationTransferable` TEXT NULL DEFAULT NULL ,
ADD PRIMARY KEY (`MichiganLicensesStagingID`);
;