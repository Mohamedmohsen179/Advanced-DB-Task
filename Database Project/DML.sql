USE Faculty_System;

INSERT INTO Faculty.Departement (Dept_ID, Dept_Name)
VALUES
(1, 'Computer Science'), 
(2, 'Information Technology'),
(3, 'Information System');



INSERT INTO Faculty.Doctor (Doc_ID, SSN, FName, LName, Email, Username, Password, Hire_Date, DOB, Gender, Hour_Rate, Hours_Per_Week, Dept_ID) 
VALUES
(10, '12345678901234', 'Moatasem', 'Draz', 'MoataemDraz@fci.edu', 'MdRAZ', 'pass123', '2023-03-01', '1990-05-15', 'M', 100, 30, 3),
(20, '23456789012345', 'Reda', 'Mabrouk', 'ReadMabrouk@fci.edu', 'RmABROUK', 'pass456', '2017-01-20', '1985-11-25', 'M', 160, 45, 3),
(30, '34567890123456', 'Mai', 'Ramadan', 'MaiRamadan@fci.edu', 'MrAMADAN', 'pass789', '2019-07-10', '1990-03-05', 'F', 145, 42, 2),
(40, '12345678901204', 'Alaa', 'Alakany', 'AlaaAlakany@fci.edu', 'AaLAKANY', 'pass523', '2018-03-01', '1988-05-15', 'M', 100, 30, 1),
(50, '10333333333333', 'Tarek', 'Mahmoud', 'tarek.mahmoud@fci.edu', 'TMAHMOUD', 'DocPass03', '2018-01-01', '1988-11-03', 'M', 150, 45, 3),
(60, '10444444444444', 'Hala', 'Farouk', 'hala.farouk@fci.edu', 'HFAROUK', 'DocPass04', '2019-11-10', '1990-06-18', 'F', 140, 30, 1),
(70, '10555555555555', 'Amr', 'Salama', 'amr.salama@fci.edu', 'ASALAMA', 'DocPass05', '2017-03-25', '1982-01-22', 'M', 190, 38, 2),
(80, '10666666666666', 'Laila', 'Khalil', 'laila.khalil@fci.edu', 'LKHALIL', 'DocPass06', '2021-09-01', '1995-07-14', 'F', 130, 40, 1),
(90, '10777777777777', 'Youssef', 'Adel', 'youssef.adel@fci.edu', 'YADEL', 'DocPass07', '2017-04-12', '1984-03-01', 'M', 165, 35, 2),
(100, '10888888888888', 'Sara', 'Mostafa', 'sara.mostafa@fci.edu', 'SMOSTAFA', 'DocPass08', '2016-06-05', '1986-10-29', 'F', 175, 42, 3);



Update Faculty.Departement
SET Doc_ID = 20 
where Dept_ID = 3

Update Faculty.Departement
SET Doc_ID = 30 
where Dept_ID = 2


INSERT INTO Faculty.Student (Stu_ID, Stu_SSN, FName, LName, Email, Username, Password, Gender, Level, DOB, CGPA, Dept_ID)
VALUES
(20221, '45678901234567', 'Mohamed', 'Mohsen', 'MohamedMohsen@fci.edu', 'MMohsen', 'stu123', 'M', 4, '2004-07-23', 3.25, 1),
(20222, '56789012345678', 'Malak', 'Alsayed', 'MalakAlsayed@fci.edu', 'MAlsayed', 'stu456', 'F', 4, '2005-05-01', 3.80, 2),
(20231, '67890123456789', 'Ahmed', 'Fahmy', 'AhmedFahmy@fci.edu', 'AFahmy', 'stu789', 'M', 3, '2005-6-10', 3.95, 3),
(20224, '78901234567890', 'Ali', 'Mahmoud', 'AliMamoud@fci.edu', 'AMahmoud', 'stu012', 'M', 4, '2004-06-25', 2.50, 3),
(20232, '78941234567890', 'Nada', 'Abdou', 'NadaAbdou@fci.edu', 'NAbdou', 'stu016', 'F', 3, '2005-03-7', 2.50, 1),
(2001, '20011111111111', 'Youssef', 'Khaled', 'youssef.khaled@fci.edu', 'YKhaled', 'StuPass01', 'M', 3, '2003-01-15', 3.45, 1),
(2002, '20022222222222', 'Lina', 'Monir', 'lina.monir@fci.edu', 'LMonir', 'StuPass02', 'F', 4, '2002-09-28', 3.80, 2),
(2003, '20033333333333', 'Mazen', 'Ali', 'mazen.ali@fci.edu', 'MAli', 'StuPass03', 'M', 1, '2005-11-05', 2.90, 3),
(2004, '20044444444444', 'Noura', 'Salim', 'nora.salim@fci.edu', 'NSalim', 'StuPass04', 'F', 2, '2004-03-12', 3.15, 2),
(2005, '20055555555555', 'Adham', 'Ragab', 'adham.ragab@fci.edu', 'ARagab', 'StuPass05', 'M', 3, '2003-07-20', 3.60, 3),
(2006, '20066666666666', 'Farah', 'Gamal', 'farah.gamal@fci.edu', 'FGamal', 'StuPass06', 'F', 4, '2002-05-01', 3.95, 1),
(2007, '20077777777777', 'Karim', 'Wael', 'karim.wael@fci.edu', 'KWael', 'StuPass07', 'M', 1, '2005-02-17', 2.75, 2),
(2008, '20088888888888', 'Hana', 'Yassin', 'hana.yassin@fci.edu', 'HYassin', 'StuPass08', 'F', 2, '2004-10-30', 3.30, 3),
(2009, '20099999999999', 'Ziad', 'Nasser', 'ziad.nasser@fci.edu', 'ZNasser', 'StuPass09', 'M', 3, '2003-04-25', 3.55, 2),
(2010, '20100000000000', 'Malak', 'Hisham', 'malak.hisham@fci.edu', 'MHisham', 'StuPass10', 'F', 4, '2002-12-09', 3.70, 1),
(2011, '20111111111111', 'Omar', 'Hatem', 'omar.hatem@fci.edu', 'OHatem', 'StuPass11', 'M', 1, '2005-08-03', 3.05, 1),
(2012, '20122222222222', 'Salma', 'Ayman', 'salma.ayman@fci.edu', 'SAyman', 'StuPass12', 'F', 2, '2004-01-19', 3.20, 2),
(2013, '20133333333333', 'Mohamed', 'Ashraf', 'mohamed.ashraf@fci.edu', 'MAshraf', 'StuPass13', 'M', 3, '2003-06-11', 3.35, 3),
(2014, '20144444444444', 'Dina', 'Nabil', 'dina.nabil@fci.edu', 'DNabil', 'StuPass14', 'F', 4, '2002-03-07', 3.90, 2),
(2015, '20155555555555', 'Mostafa', 'Saleh', 'mostafa.saleh@fci.edu', 'MSaleh', 'StuPass15', 'M', 1, '2005-10-29', 2.85, 3),
(2016, '20166666666666', 'Aya', 'Radwan', 'aya.radwan@fci.edu', 'ARadwan', 'StuPass16', 'F', 2, '2004-07-24', 3.40, 1),
(2017, '20177777777777', 'Hassan', 'Kamal', 'hassan.kamal@fci.edu', 'HKamal', 'StuPass17', 'M', 3, '2003-02-02', 3.65, 2),
(2018, '20188888888888', 'Aliaa', 'Zaki', 'aliaa.zaki@fci.edu', 'AZaki', 'StuPass18', 'F', 4, '2002-11-16', 3.75, 3),
(2019, '20199999999999', 'Ibrahim', 'Mansour', 'ibrahim.mansour@fci.edu', 'IMansour', 'StuPass19', 'M', 1, '2005-04-18', 3.10, 1),
(2020, '20200000000000', 'Shahd', 'Mohsen', 'shahd.mohsen@fci.edu', 'SMohsen', 'StuPass20', 'F', 2, '2004-09-08', 3.50, 1);


INSERT INTO Faculty.Course (Crs_Name, Discription, Credit_Hours, Doc_ID, Dept_ID)
VALUES
('Database Advanced', 'Advanced topics in Datbase design and managemnt', 3, 10, 2),
('Computer Network', 'Introdunction to newtork and protocols mahagement', 3, 30, 2),
('Software Engineering', 'Introdunction for System and Software Manageing', 2, 20, 3),
('Data Structures', 'In-depth study of efficient data organization.', 3, 20, 1),   
('Advanced Databases', 'Advanced concepts in database design and optimization.', 3, 90, 3), 
('Machine Learning', 'Introduction to fundamental machine learning algorithms.', 3, 80, 1),     
('Cloud Services Management', 'Managing and deploying applications on the cloud platform.', 3, 50, 1),  
('Algorithms Analysis', 'Analyzing the complexity of advanced algorithms.', 3, 20, 1),    
('Information Security', 'Principles of protecting systems and data integrity.', 3, 30, 3);


INSERT INTO Faculty.Course_Schedule (Crs_ID, Day, Start_Hour, END_Hour, Level, Location)
VALUES
(1, 'Sunday', '09:00:00', '11:00:00', 3, 'Hall 03'),
(3, 'Tuesday', '11:00:00', '13:00:00', 4, 'Hall 01'),
(1, 'Wednesday', '14:00:00', '15:30:00', 3, 'Lab 02'),
(1, 'Sunday', '10:00:00', '11:30:00', 3, 'Lecture Hall A'),
(1, 'Tuesday', '14:00:00', '15:30:00', 3, 'Lab 305'),
(2, 'Monday', '09:30:00', '11:00:00', 4, 'Lecture Hall B'),
(2, 'Wednesday', '13:00:00', '14:30:00', 4, 'Lab 402'),
(3, 'Thursday', '11:00:00', '13:00:00', 1, 'Design Studio 1');


INSERT INTO Faculty.Teach (Crs_ID, Doc_ID, Semester)
VALUES
(1, 20, 'Spring 2024'), 
(2, 30, 'Summer 2021'),
(10, 100, 'Fall 2024'),
(9, 90, 'Spring 2025');


INSERT INTO Faculty.Enrollement (Stu_ID, Crs_ID, Grade, Year)
VALUES
(20221, 1, 85, '2024-25'),
(20222, 2, 92, '2024-25'),
(20231, 1, 78, '2024-25'),
(20224, 3, 88, '2024-25');


INSERT INTO Faculty.Doctor_Phone (Doc_ID, Phone_NUM) VALUES
(10, '01012345678'),
(10, '01298765432'),
(20, '01515345271'),
(40, '01232098452'),
(100, '01010001000'), 
(100, '01020002000'), 
(40, '01130003000'), 
(30, '01240004000'), 
(70, '01050005000'),
(70, '01160006000'), 
(90, '01270007000'), 
(80, '01080008000'), 
(80, '01190009000');


INSERT INTO Faculty.Student_Phone (Stu_ID, Phone_NUM) VALUES
(20221, '01020479938'),
(20222, '01212488680'),
(20222, '01559151932');


INSERT INTO Faculty.Doctor_Address (Doc_ID, City, Street) VALUES
(20, 'Dosouk', '23 ST'),
(30, 'Mansoura', '21 ST'),
(10, 'Giza', 'Nile Street'),
(20, 'Cairo', 'Maadi Ring Road'),
(40, 'Alexandria', 'Corniche Road'),
(40, 'Cairo', 'Nasr City Avenue'),
(70, 'Giza', 'Dokki Square'),
(70, 'Sharm El Sheikh', 'Peace Road'),
(80, 'Luxor', 'Karnak Temple St'),
(90, 'Cairo', 'Heliopolis'),
(100, 'Giza', 'Mohandessin Area'),
(100, 'Alexandria', 'Smoha Complex');


INSERT INTO Faculty.Student_Address (Stu_ID, City, Street) VALUES
(20222, 'ElAgami', 'Elwardian'),
(20232, 'Rashid', 'Old Street'),
(2001, 'Giza', 'Pyramids Street'),
(2003, 'Cairo', 'Nasr City Avenue'),
(2005, 'Alexandria', 'Corniche Road'),
(2010, 'Giza', 'Mohandessin Area'),
(2015, 'Cairo', 'Maadi Ring Road');


---------------------------- delete ---------------------------
delete from Faculty.Course_Schedule
where Crs_ID = 2


delete from Faculty.Enrollement
where Stu_ID in (select Stu_ID from Faculty.Student_Address where City='ElAgami')

