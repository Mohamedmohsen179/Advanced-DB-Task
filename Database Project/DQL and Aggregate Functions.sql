USE Faculty_System;

SELECT FName +' ' + LName As 'Full Name', Email
FROM Faculty.Student;


SELECT DISTINCT City
FROM Faculty.Doctor_Address;


SELECT Crs_Name, Credit_Hours
FROM Faculty.Course
WHERE Credit_Hours >= 2;


SELECT TOP(10) FName, LName, CGPA
FROM Faculty.Student
ORDER BY CGPA DESC;


SELECT Dept_ID, avg(CGPA) AS Avg_CGPA
FROM Faculty.Student
GROUP BY Dept_ID;


SELECT Distinct Dept_Name
FROM Faculty.Student s inner join Faculty.Departement d
on d.Dept_ID = s.Dept_ID


SELECT MAX(CGPA) AS 'MAX CGPA'
FROM Faculty.Student
WHere Dept_ID = 2


SELECT top(5) FName
FROM Faculty.Student
ORDER BY len(FName) desc


SELECT S.FName +' ' + S.LName AS 'Full Name', S.Email, D.Dept_Name
FROM Faculty.Student S JOIN Faculty.Departement D 
ON S.Dept_ID = D.Dept_ID
WHERE
    D.Dept_Name IN('Computer Science', 'Information Technology')
    AND S.CGPA > 3.5
Order BY S.CGPA DESC;


SELECT Dept_Name
FROM Faculty.Departement
WHERE Dept_ID in (
		SELECT DISTINCT(Dept_ID)
		FROM Faculty.Student
		Where Dept_ID is not null
		)


SELECT D.Doc_ID, D.FName, D.LName,
COUNT(A.Street) AS Number_of_Addresses
FROM Faculty.Doctor D join Faculty.Doctor_Address A 
ON D.Doc_ID = A.Doc_ID
GROUP BY 
	D.Doc_ID, D.FName, D.LName
HAVING
    COUNT(A.Street) > 1;


SELECT D.Doc_ID, D.FName, D.LName, Dept.Dept_Name AS Specizlized_Department
FROM Faculty.Doctor D JOIN Faculty.Departement Dept 
ON D.Dept_ID = Dept.Dept_ID
WHERE
    EXISTS (
        SELECT 1
        FROM Faculty.Teach T JOIN Faculty.Course C 
		ON T.Crs_ID = C.Crs_ID
        WHERE T.Doc_ID = D.Doc_ID AND C.Dept_ID != D.Dept_ID
    );