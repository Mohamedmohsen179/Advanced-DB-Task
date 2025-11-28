USE master;

drop database Faculty_System;
create database Faculty_System;

USE Faculty_System;

drop schema Faculty;
create Schema Faculty;


CREATE TABLE Faculty.Departement
(
	Dept_ID INT Primary Key,
	Dept_Name varchar(100) NOT NULL,
	Doc_ID INT NOT NULL
);


CREATE TABLE Faculty.Doctor
(
	Doc_ID int Primary KEY,
	SSN varchar(14) UNIQUE NOT NULL,
	FName varchar(50) NOT NULL,
	LName varchar(50) NOT NULL,
	Email varchar(100) UNIQUE NOT NULL,
	Username Varchar(50) UNIQUE NOT NULL,
	Password varchar(10) UNIQUE NOT NULL,
	Hire_Date date default getdate(),
	DOB date,
	Age as (year(getdate()) - year (DOB)),
	Gender int,
	Hour_Rate int,
	Hours_Per_Week int,
	Salary as (Hour_Rate * Hours_Per_Week * 4) persisted,
	Dept_ID INT NOT NULL

	Constraint FK_DEPT_NUM Foreign Key(Dept_ID) references Faculty.Departement(Dept_ID)
);



AlTER TABLE Faculty.Departement
Add Constraint FK_DEPT_HDOCTOR
Foreign Key(Doc_ID) references Faculty.Doctor(DOC_ID);

ALTER TABLE Faculty.Doctor
ALTER COLUMN Gender varchar(1);


ALTER TABLE Faculty.Doctor
Add constraint CK_Gender
Check(Gender IN ('F', 'M'));


CREATE TABLE Faculty.Student
(
	Stu_ID int Primary KEY,
	Stu_SSN varchar(14) UNIQUE NOT NULL,
	FName varchar(50) NOT NULL,
	LName varchar(50) NOT NULL,
	Email varchar(100) UNIQUE NOT NULL,
	Username Varchar(50) UNIQUE NOT NULL,
	Password varchar(255)NOT NULL,
	Gender varchar(1) check (Gender IN ('F', 'M')),
	Level int check(Level >=1 AND Level <= 4),
	DOB date,
	Age AS (year(getdate()) - year(DOB)),
	CGPA decimal(3, 2),
	Dept_ID int NOT NULL

	Constraint FK_STU_DEPT Foreign Key(Dept_ID) references Faculty.Departement(Dept_ID)
);


CREATE TABLE Faculty.Course
(
	Crs_ID INT IDENTITY(1,1) Primary Key,
	Crs_Name varchar(50) NOT NULL Unique,
	Discription Varchar(500) NOT NULL,
	Duration int NOT NULL,
	Doc_ID int Not null,
	Dept_ID int Not NULL

	Constraint FK_CRS_DOC Foreign Key(Doc_ID) references Faculty.Doctor(Doc_ID),
	Constraint FK_CRS_DEPT Foreign Key (DEPT_ID) references Faculty.Departement(Dept_ID)
);

EXEC sp_rename 'Faculty.Course.Duration', 'Credit_Hours', 'COLUMN';


CREATE TABLE Faculty.Course_Schedule
(
	Sch_ID int IDENTITY(1,1),
	Crs_ID int NOT NULL,
	Day Varchar(15) NOT NULL check (Day IN('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday')),
	Start_Hour time NOT NULL,
	END_Hour time NOT NULL,
	Level INT check(Level >=1 AND Level <= 4),
	Location varchar(100),

	constraint PK_CRS_SCH Primary Key(Sch_ID, CRS_ID),
	constraint FK_CRS_SCH Foreign Key(Crs_ID) references Faculty.Course(Crs_ID)
);


CREATE TABLE Faculty.Enrollement
(
	Stu_ID int NOT NULL,
	Crs_ID int NOT NULL, 
	Grade int check(Grade>=0 AND Grade <=100),
	Year varchar(7),

	constraint PK_STU_ENROLL Primary Key(Stu_ID, Crs_ID, Year),
	constraint FK_STU_ENROLL Foreign Key(Stu_ID) references Faculty.Student(Stu_ID),
	constraint FK_Crs_ENROLL Foreign Key(Crs_ID) references Faculty.Course(Crs_ID)

);


CREATE TABLE Faculty.Teach
(
	Crs_ID int Not NULL,
	Doc_ID int NOT NULL,
	Semester varchar(50) NOT NULL

	constraint PK_TEACH Primary Key(Crs_ID, Doc_ID, Semester),
	Constraint FK_CRS_TEACH Foreign Key(Crs_ID) references Faculty.Course(Crs_ID),
	Constraint FK_DOC_TEACH Foreign Key(Doc_ID) references Faculty.Doctor(Doc_ID)
);


CREATE TABLE Faculty.Doctor_Phone
(
	Doc_ID int Not NULL,
	Phone_NUM varchar(20)

	constraint PK_DOC_PHONE primary key(Doc_ID, Phone_NUM),
	constraint FK_NUM_DOC foreign key(Doc_ID) references Faculty.Doctor(Doc_ID)
);


ALTER TABLE Faculty.Doctor_Phone
Alter COLUMN 
Phone_NUM varchar(20) Not NULL


CREATE TABLE Faculty.Student_Phone
(
	Stu_ID int Not NULL,
	Phone_NUM varchar(20) 

	constraint PK_Stu_PHONE primary key(Stu_ID, Phone_NUM),
	constraint FK_NUM_STU foreign key(Stu_ID) references Faculty.Student(Stu_ID)
);

ALTER TABLE Faculty.Student_Phone
Alter COLUMN 
Phone_NUM varchar(20) Not NULL


CREATE TABLE Faculty.Doctor_Address
(
	Doc_ID int NOT NULL,
	City VARCHAR(50) NOT NULL,
    Street VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (Doc_ID, City, Street),
    FOREIGN KEY (Doc_ID) REFERENCES Faculty.Doctor(Doc_ID)
);


CREATE TABLE Faculty.Student_Address
(
	Stu_ID int NOT NULL,
	City VARCHAR(50) NOT NULL,
    Street VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (Stu_ID, City, Street),
    FOREIGN KEY (Stu_ID) REFERENCES Faculty.Student(Stu_ID)
);

DROP TABLE Faculty.Student_Address; 

CREATE TABLE Faculty.Student_Address
(
	Stu_ID int NOT NULL,
	City VARCHAR(50) NOT NULL,
    Street VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (Stu_ID, City, Street),
    FOREIGN KEY (Stu_ID) REFERENCES Faculty.Student(Stu_ID)
);




