USE Faculty_System;

-------------------------  User Functions --------------------------

CREATE FUNCTION Faculty.CalculateYearsOfService (@HireDate DATE)
RETURNS INT
AS
BEGIN
    DECLARE @Years INT;
    SET @Years = DATEDIFF(year, @HireDate, GETDATE());
    
    IF DATEADD(year, @Years, @HireDate) > GETDATE()
        SET @Years = @Years - 1;

    RETURN @Years;
END
GO

SELECT
    FName,
    LName,
    Hire_Date,
    Faculty.CalculateYearsOfService(Hire_Date) AS Years_of_Service
FROM
    Faculty.Doctor
WHERE
    Faculty.CalculateYearsOfService(Hire_Date) > 7;



CREATE FUNCTION Faculty.GetCourseSchedule (@CourseID INT)
RETURNS TABLE
AS
RETURN
(
    SELECT CS.Day, CS.Start_Hour, CS.Location, C.Crs_Name
    FROM Faculty.Course_Schedule CS JOIN Faculty.Course C 
	ON CS.Crs_ID = C.Crs_ID
    WHERE
        CS.Crs_ID = @CourseID
);
GO

SELECT *
FROM Faculty.GetCourseSchedule(1); 

-------------------------  View --------------------------

CREATE VIEW Faculty.StudentDetailsView
AS
SELECT S.Stu_ID, S.FName + ' ' + S.LName AS FullName, D.Dept_Name, S.Level, P.Phone_NUM AS PrimaryPhone
FROM Faculty.Student S JOIN Faculty.Departement D 
ON S.Dept_ID = D.Dept_ID
	LEFT JOIN  Faculty.Student_Phone P 
	ON S.Stu_ID = P.Stu_ID
GO

SELECT FullName, Dept_Name, PrimaryPhone
FROM Faculty.StudentDetailsView
WHERE Level = 4;



CREATE VIEW Faculty.PublicDoctorInfoView
AS
SELECT DR.Doc_ID, DR.FName, DR.LName, DR.Email, DR.Hire_Date, D.Dept_Name
FROM Faculty.Doctor DR JOIN Faculty.Departement D 
ON DR.Dept_ID = D.Dept_ID;
GO

SELECT TOP(7) Doc_ID, FName, LName, Email, Hire_Date, Dept_Name
FROM Faculty.PublicDoctorInfoView



CREATE VIEW Faculty.TopPerformersView
AS
SELECT S.Stu_ID, S.FName + ' ' + S.LName AS StudentFullName, C.Crs_Name AS CourseTitle, E.Grade, E.Year
FROM Faculty.Student S JOIN Faculty.Enrollement E 
	ON S.Stu_ID = E.Stu_ID
		JOIN Faculty.Course C 
			ON E.Crs_ID = C.Crs_ID
WHERE
    E.Grade >= 80;
GO

SELECT StudentFullName, CourseTitle, Grade
FROM Faculty.TopPerformersView
ORDER BY Grade DESC;



CREATE VIEW Faculty.PublicScheduleView
AS
SELECT C.Crs_Name AS Course_Name,
	   C.Discription AS Course_Description,
       CS.Day AS Meeting_Day,
       CS.Start_Hour AS Starts_At,
       CS.END_Hour AS Ends_At,
       CS.Level AS Target_Level,
       CS.Location AS Room_Location,
       D.FName + ' ' + D.LName AS Instructor_Name
FROM Faculty.Course_Schedule CS JOIN Faculty.Course C 
	ON CS.Crs_ID = C.Crs_ID
		JOIN Faculty.Doctor D 
			ON C.Doc_ID = D.Doc_ID;
GO

SELECT Course_Name, Instructor_Name, Meeting_Day, Starts_At, Room_Location
FROM Faculty.PublicScheduleView
WHERE Target_Level = 4
ORDER BY Meeting_Day, Starts_At;



-------------------------  Stored Procedures --------------------------



CREATE PROCEDURE Faculty.AddStudent (
    @StuID INT,
    @SSN VARCHAR(14),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Email VARCHAR(100),
    @Username VARCHAR(50),
    @Password VARCHAR(255),
    @Gender CHAR(1),
    @Level INT,
    @DOB DATE,
    @CGPA DECIMAL(3, 2),
    @DeptID INT
)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @Level NOT BETWEEN 1 AND 4
    BEGIN
        RAISERROR('Level must be between 1 and 4.', 16, 1);
        RETURN;
    END
    INSERT INTO Faculty.Student (
        Stu_ID, Stu_SSN, FName, LName, Email, Username, Password, Gender, Level, DOB, CGPA, Dept_ID
    )
    VALUES (
        @StuID, @SSN, @FirstName, @LastName, @Email, @Username, @Password, @Gender, @Level, @DOB, @CGPA, @DeptID
    );
END
GO

EXEC Faculty.AddStudent 
    @StuID = 3000, 
    @SSN = '30000000000000', 
    @FirstName = 'Khaled', 
    @LastName = 'Fawzy', 
    @Email = 'khaled.fawzy@fci.edu', 
    @Username = 'KFawzy', 
    @Password = 'newpass2025', 
    @Gender = 'M', 
    @Level = 1, 
    @DOB = '2006-03-10', 
    @CGPA = 3.10, 
    @DeptID = 1;





CREATE PROCEDURE Faculty.EnrollStudentInCourse (
    @StudentID INT,
    @CourseID INT,
    @EnrollYear VARCHAR(7),
    @InitialGrade INT = 0 -- Default to 0 if not provided
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    IF EXISTS (SELECT 1 FROM Faculty.Enrollement WHERE Stu_ID = @StudentID AND Crs_ID = @CourseID AND Year = @EnrollYear)
    BEGIN
        ROLLBACK TRANSACTION;
        RAISERROR('Student already enrolled in this course for this year.', 16, 1);
        RETURN;
    END
END
GO


-------------------------  Triggers --------------------------

CREATE TABLE Faculty.DoctorRateAudit (
    AuditID INT IDENTITY(1,1) PRIMARY KEY,
    Doc_ID INT NOT NULL,
    Old_Rate INT,
    New_Rate INT,
    Change_Date DATETIME DEFAULT GETDATE(),
    Changed_By VARCHAR(128) DEFAULT SUSER_SNAME()
);
GO

CREATE TRIGGER Faculty.trg_Doctor_Rate_Audit
ON Faculty.Doctor
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
     IF UPDATE(Hour_Rate)
    BEGIN
        INSERT INTO Faculty.DoctorRateAudit (Doc_ID, Old_Rate, New_Rate)
        SELECT i.Doc_ID, d.Hour_Rate, i.Hour_Rate 
        FROM inserted i JOIN deleted d   
        ON i.Doc_ID = d.Doc_ID
        WHERE
            i.Hour_Rate != d.Hour_Rate
    END
END
GO



CREATE TRIGGER Faculty.trg_Student_Level4_CGPA_Check
ON Faculty.Student
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE i.Level = 4 AND i.CGPA < 3.00
    )
    BEGIN
        RAISERROR('Level 4 students must maintain a CGPA of 3.0 or higher. Insertion/Update rejected.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END
GO


