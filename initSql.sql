DROP DATABASE project3;
CREATE DATABASE IF NOT EXISTS project3;
USE project3;
CREATE TABLE Hospital (
    hospitalId int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    rooms int NOT NULL,
    PRIMARY KEY (hospitalId)
);

INSERT INTO `project3`.`hospital` (`hospitalId`, `name`, `address`, `rooms`) VALUES ('1', 'Sở y tế', `Hà Nội`, `0`);

CREATE TABLE Role (
    roleId int NOT NULL AUTO_INCREMENT,
    roleName varchar(50) NOT NULL,
    PRIMARY KEY (roleId)
);

INSERT INTO `project3`.`role` (`roleId`, `roleName`) VALUES ('1', 'Nhân viên Sở y tế');
INSERT INTO `project3`.`role` (`roleId`, `roleName`) VALUES ('2', 'Y tá');
INSERT INTO `project3`.`role` (`roleId`, `roleName`) VALUES ('3', 'Bác sĩ');
INSERT INTO `project3`.`role` (`roleId`, `roleName`) VALUES ('4', 'Nhân viên điểm xét nghiệm');
INSERT INTO `project3`.`role` (`roleId`, `roleName`) VALUES ('5', 'Quản lý cơ sở y tế');

CREATE TABLE Staff (
    staffId int NOT NULL AUTO_INCREMENT,
    hospitalId int NOT NULL,
    roleId int NOT NULL,
    staffName varchar(255) NOT NULL,
    phone char(20) NOT NULL,
    dob date NOT NULL,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    address varchar(255) NOT NULL,
    PRIMARY KEY (staffId),
    FOREIGN KEY (hospitalId) REFERENCES Hospital(hospitalId),
    FOREIGN KEY (roleId) REFERENCES Role(roleId)
);

INSERT INTO `project3`.`staff` (`hospitalId`, `roleId`, `staffName`, `phone`, `dob`, `username`, `password`, `address`) VALUES ('1', '1', 'Nguyễn Văn A', '000', '1988-02-03', 'ANV000', '000', 'Hà Nam');

CREATE TABLE Room (
    roomId int NOT NULL AUTO_INCREMENT,
    hospitalId int NOT NULL,
    roomNumber int NOT NULL,
    beds int NOT NULL,
    patients int NOT NULL,
    PRIMARY KEY (roomId),
    FOREIGN KEY (hospitalId) REFERENCES Hospital(hospitalId)
);

CREATE TABLE RoomMaster (
	id int NOT NULL AUTO_INCREMENT,
    roomId int NOT NULL,
    staffId int NOT NULL,
    startTime date,
    endTime date,
    PRIMARY KEY (id),
    FOREIGN KEY (roomId) REFERENCES Room(roomId),
    FOREIGN KEY (staffId) REFERENCES Staff(staffId)
);

CREATE TABLE Patient (
    patientId int NOT NULL AUTO_INCREMENT,
    hospitalId int NOT NULL,
    roomId int NOT NULL,
    patientName varchar(255) NOT NULL,
    identifyNumber varchar(20) NOT NULL,
    healthInsuranceNumber varchar(20),
    address varchar(255),
    phone varchar(20),
    dob date NOT NULL,
    sex varchar(20),
    startTime date,
    endTime date,
    level int,
    PRIMARY KEY (patientId),
    FOREIGN KEY (hospitalId) REFERENCES Hospital(hospitalId),
    FOREIGN KEY (roomId) REFERENCES Room(roomId)
);

CREATE TABLE MedicalRecord (
    recordId int NOT NULL AUTO_INCREMENT,
    staffId int NOT NULL,
    patientId int NOT NULL,
    treatmentTime datetime NOT NULL,
    bodyTemperature int NOT NULL,
    vaccinesAdministered int NOT NULL,
    spO2 int NOT NULL,
    backgroundDisease varchar(255),
    breathingFrequency int NOT NULL,
    heartbeat int NOT NULL,
    bloodPresure int NOT NULL,
    isFever boolean NOT NULL,
    isCough boolean NOT NULL,
    isSoreThroat boolean NOT NULL,
    isOxygenSupport boolean NOT NULL,
    isHardBreath boolean NOT NULL,
    isMusclePain boolean NOT NULL,
    isLossOfTaste boolean NOT NULL,
    PRIMARY KEY (recordId),
    FOREIGN KEY (staffId) REFERENCES Staff(staffId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId)
);

CREATE TABLE TestCamp (
	campId int NOT NULL AUTO_INCREMENT,
    address varchar(255) NOT NULL,
    PRIMARY KEY (campId)
);

CREATE TABLE InCharge (
	id int NOT NULL AUTO_INCREMENT,
    campId int NOT NULL,
    staffId int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (staffId) REFERENCES Staff(staffId),
    FOREIGN KEY (campId) REFERENCES TestCamp(campId)
);

CREATE TABLE Discharge (
	id int NOT NULL AUTO_INCREMENT,
    patientId int NOT NULL,
    hospitalId int NOT NULL,
    leaveDate date NOT NULL,
    fee int NOT NULL,
    isDeath boolean NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId),
    FOREIGN KEY (hospitalId) REFERENCES Hospital(hospitalId)
);

CREATE TABLE Transfer (
    id INT NOT NULL AUTO_INCREMENT,
    patientId INT NOT NULL,
    leaveDate DATE NOT NULL,
    fee INT NOT NULL,
    beforeId INT NOT NULL,
    afterId INT NOT NULL,
    status INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (beforeId)
        REFERENCES Hospital (hospitalId),
    FOREIGN KEY (afterId)
        REFERENCES Hospital (hospitalId)
);

ALTER TABLE `project3`.`patient` 
ADD COLUMN `level` INT ZEROFILL NULL AFTER `endTime`;