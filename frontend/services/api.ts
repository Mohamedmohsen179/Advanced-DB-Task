import {
  Student,
  Doctor,
  Department,
  Course,
  CourseWithSchedule,
  Enrollment,
  CreateStudentRequest,
  UpdateStudentRequest,
  CreateDoctorRequest,
  UpdateDoctorRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  PaginatedResponse,
  ApiResponse,
  PaginationParams,
  CourseSchedule,
  StudentPhone,
  StudentAddress,
  DoctorPhone,
  DoctorAddress,
} from '../types';

// Mock Students from Faculty_System database
const mockStudents: Student[] = [
  {
    Stu_ID: 20221,
    Stu_SSN: '45678901234567',
    FName: 'Mohamed',
    LName: 'Mohsen',
    Email: 'MohamedMohsen@fci.edu',
    Username: 'MMohsen',
    Password: 'stu123',
    Gender: 'M',
    Level: 4,
    DOB: '2004-07-23',
    Age: new Date().getFullYear() - 2004,
    CGPA: 3.25,
    Dept_ID: 1,
    phones: [{ Stu_ID: 20221, Phone_NUM: '01020479938' }],
  },
  {
    Stu_ID: 20222,
    Stu_SSN: '56789012345678',
    FName: 'Malak',
    LName: 'Alsayed',
    Email: 'MalakAlsayed@fci.edu',
    Username: 'MAlsayed',
    Password: 'stu456',
    Gender: 'F',
    Level: 4,
    DOB: '2005-05-01',
    Age: new Date().getFullYear() - 2005,
    CGPA: 3.80,
    Dept_ID: 2,
    phones: [{ Stu_ID: 20222, Phone_NUM: '01212488680' }, { Stu_ID: 20222, Phone_NUM: '01559151932' }],
    addresses: [{ Stu_ID: 20222, City: 'ElAgami', Street: 'Elwardian' }],
  },
  {
    Stu_ID: 20231,
    Stu_SSN: '67890123456789',
    FName: 'Ahmed',
    LName: 'Fahmy',
    Email: 'AhmedFahmy@fci.edu',
    Username: 'AFahmy',
    Password: 'stu789',
    Gender: 'M',
    Level: 3,
    DOB: '2005-06-10',
    Age: new Date().getFullYear() - 2005,
    CGPA: 3.95,
    Dept_ID: 3,
  },
  {
    Stu_ID: 20224,
    Stu_SSN: '78901234567890',
    FName: 'Ali',
    LName: 'Mahmoud',
    Email: 'AliMamoud@fci.edu',
    Username: 'AMahmoud',
    Password: 'stu012',
    Gender: 'M',
    Level: 4,
    DOB: '2004-06-25',
    Age: new Date().getFullYear() - 2004,
    CGPA: 2.50,
    Dept_ID: 3,
  },
  {
    Stu_ID: 20232,
    Stu_SSN: '78941234567890',
    FName: 'Nada',
    LName: 'Abdou',
    Email: 'NadaAbdou@fci.edu',
    Username: 'NAbdou',
    Password: 'stu016',
    Gender: 'F',
    Level: 3,
    DOB: '2005-03-07',
    Age: new Date().getFullYear() - 2005,
    CGPA: 2.50,
    Dept_ID: 1,
    addresses: [{ Stu_ID: 20232, City: 'Rashid', Street: 'Old Street' }],
  },
  {
    Stu_ID: 2001,
    Stu_SSN: '20011111111111',
    FName: 'Youssef',
    LName: 'Khaled',
    Email: 'youssef.khaled@fci.edu',
    Username: 'YKhaled',
    Password: 'StuPass01',
    Gender: 'M',
    Level: 3,
    DOB: '2003-01-15',
    Age: new Date().getFullYear() - 2003,
    CGPA: 3.45,
    Dept_ID: 1,
    addresses: [{ Stu_ID: 2001, City: 'Giza', Street: 'Pyramids Street' }],
  },
  {
    Stu_ID: 2002,
    Stu_SSN: '20022222222222',
    FName: 'Lina',
    LName: 'Monir',
    Email: 'lina.monir@fci.edu',
    Username: 'LMonir',
    Password: 'StuPass02',
    Gender: 'F',
    Level: 4,
    DOB: '2002-09-28',
    Age: new Date().getFullYear() - 2002,
    CGPA: 3.80,
    Dept_ID: 2,
  },
  {
    Stu_ID: 2003,
    Stu_SSN: '20033333333333',
    FName: 'Mazen',
    LName: 'Ali',
    Email: 'mazen.ali@fci.edu',
    Username: 'MAli',
    Password: 'StuPass03',
    Gender: 'M',
    Level: 1,
    DOB: '2005-11-05',
    Age: new Date().getFullYear() - 2005,
    CGPA: 2.90,
    Dept_ID: 3,
    addresses: [{ Stu_ID: 2003, City: 'Cairo', Street: 'Nasr City Avenue' }],
  },
  {
    Stu_ID: 2004,
    Stu_SSN: '20044444444444',
    FName: 'Noura',
    LName: 'Salim',
    Email: 'nora.salim@fci.edu',
    Username: 'NSalim',
    Password: 'StuPass04',
    Gender: 'F',
    Level: 2,
    DOB: '2004-03-12',
    Age: new Date().getFullYear() - 2004,
    CGPA: 3.15,
    Dept_ID: 2,
  },
  {
    Stu_ID: 2005,
    Stu_SSN: '20055555555555',
    FName: 'Adham',
    LName: 'Ragab',
    Email: 'adham.ragab@fci.edu',
    Username: 'ARagab',
    Password: 'StuPass05',
    Gender: 'M',
    Level: 3,
    DOB: '2003-07-20',
    Age: new Date().getFullYear() - 2003,
    CGPA: 3.60,
    Dept_ID: 3,
    addresses: [{ Stu_ID: 2005, City: 'Alexandria', Street: 'Corniche Road' }],
  },
  {
    Stu_ID: 2006,
    Stu_SSN: '20066666666666',
    FName: 'Farah',
    LName: 'Gamal',
    Email: 'farah.gamal@fci.edu',
    Username: 'FGamal',
    Password: 'StuPass06',
    Gender: 'F',
    Level: 4,
    DOB: '2002-05-01',
    Age: new Date().getFullYear() - 2002,
    CGPA: 3.95,
    Dept_ID: 1,
  },
  {
    Stu_ID: 2007,
    Stu_SSN: '20077777777777',
    FName: 'Karim',
    LName: 'Wael',
    Email: 'karim.wael@fci.edu',
    Username: 'KWael',
    Password: 'StuPass07',
    Gender: 'M',
    Level: 1,
    DOB: '2005-02-17',
    Age: new Date().getFullYear() - 2005,
    CGPA: 2.75,
    Dept_ID: 2,
  },
  {
    Stu_ID: 2008,
    Stu_SSN: '20088888888888',
    FName: 'Hana',
    LName: 'Yassin',
    Email: 'hana.yassin@fci.edu',
    Username: 'HYassin',
    Password: 'StuPass08',
    Gender: 'F',
    Level: 2,
    DOB: '2004-10-30',
    Age: new Date().getFullYear() - 2004,
    CGPA: 3.30,
    Dept_ID: 3,
  },
  {
    Stu_ID: 2009,
    Stu_SSN: '20099999999999',
    FName: 'Ziad',
    LName: 'Nasser',
    Email: 'ziad.nasser@fci.edu',
    Username: 'ZNasser',
    Password: 'StuPass09',
    Gender: 'M',
    Level: 3,
    DOB: '2003-04-25',
    Age: new Date().getFullYear() - 2003,
    CGPA: 3.55,
    Dept_ID: 2,
  },
  {
    Stu_ID: 2010,
    Stu_SSN: '20100000000000',
    FName: 'Malak',
    LName: 'Hisham',
    Email: 'malak.hisham@fci.edu',
    Username: 'MHisham',
    Password: 'StuPass10',
    Gender: 'F',
    Level: 4,
    DOB: '2002-12-09',
    Age: new Date().getFullYear() - 2002,
    CGPA: 3.70,
    Dept_ID: 1,
    addresses: [{ Stu_ID: 2010, City: 'Giza', Street: 'Mohandessin Area' }],
  },
  {
    Stu_ID: 2011,
    Stu_SSN: '20111111111111',
    FName: 'Omar',
    LName: 'Hatem',
    Email: 'omar.hatem@fci.edu',
    Username: 'OHatem',
    Password: 'StuPass11',
    Gender: 'M',
    Level: 1,
    DOB: '2005-08-03',
    Age: new Date().getFullYear() - 2005,
    CGPA: 3.05,
    Dept_ID: 1,
  },
  {
    Stu_ID: 2012,
    Stu_SSN: '20122222222222',
    FName: 'Salma',
    LName: 'Ayman',
    Email: 'salma.ayman@fci.edu',
    Username: 'SAyman',
    Password: 'StuPass12',
    Gender: 'F',
    Level: 2,
    DOB: '2004-01-19',
    Age: new Date().getFullYear() - 2004,
    CGPA: 3.20,
    Dept_ID: 2,
  },
  {
    Stu_ID: 2013,
    Stu_SSN: '20133333333333',
    FName: 'Mohamed',
    LName: 'Ashraf',
    Email: 'mohamed.ashraf@fci.edu',
    Username: 'MAshraf',
    Password: 'StuPass13',
    Gender: 'M',
    Level: 3,
    DOB: '2003-06-11',
    Age: new Date().getFullYear() - 2003,
    CGPA: 3.35,
    Dept_ID: 3,
  },
  {
    Stu_ID: 2014,
    Stu_SSN: '20144444444444',
    FName: 'Dina',
    LName: 'Nabil',
    Email: 'dina.nabil@fci.edu',
    Username: 'DNabil',
    Password: 'StuPass14',
    Gender: 'F',
    Level: 4,
    DOB: '2002-03-07',
    Age: new Date().getFullYear() - 2002,
    CGPA: 3.90,
    Dept_ID: 2,
  },
  {
    Stu_ID: 2015,
    Stu_SSN: '20155555555555',
    FName: 'Mostafa',
    LName: 'Saleh',
    Email: 'mostafa.saleh@fci.edu',
    Username: 'MSaleh',
    Password: 'StuPass15',
    Gender: 'M',
    Level: 1,
    DOB: '2005-10-29',
    Age: new Date().getFullYear() - 2005,
    CGPA: 2.85,
    Dept_ID: 3,
    addresses: [{ Stu_ID: 2015, City: 'Cairo', Street: 'Maadi Ring Road' }],
  },
  {
    Stu_ID: 2016,
    Stu_SSN: '20166666666666',
    FName: 'Aya',
    LName: 'Radwan',
    Email: 'aya.radwan@fci.edu',
    Username: 'ARadwan',
    Password: 'StuPass16',
    Gender: 'F',
    Level: 2,
    DOB: '2004-07-24',
    Age: new Date().getFullYear() - 2004,
    CGPA: 3.40,
    Dept_ID: 1,
  },
  {
    Stu_ID: 2017,
    Stu_SSN: '20177777777777',
    FName: 'Hassan',
    LName: 'Kamal',
    Email: 'hassan.kamal@fci.edu',
    Username: 'HKamal',
    Password: 'StuPass17',
    Gender: 'M',
    Level: 3,
    DOB: '2003-02-02',
    Age: new Date().getFullYear() - 2003,
    CGPA: 3.65,
    Dept_ID: 2,
  },
  {
    Stu_ID: 2018,
    Stu_SSN: '20188888888888',
    FName: 'Aliaa',
    LName: 'Zaki',
    Email: 'aliaa.zaki@fci.edu',
    Username: 'AZaki',
    Password: 'StuPass18',
    Gender: 'F',
    Level: 4,
    DOB: '2002-11-16',
    Age: new Date().getFullYear() - 2002,
    CGPA: 3.75,
    Dept_ID: 3,
  },
  {
    Stu_ID: 2019,
    Stu_SSN: '20199999999999',
    FName: 'Ibrahim',
    LName: 'Mansour',
    Email: 'ibrahim.mansour@fci.edu',
    Username: 'IMansour',
    Password: 'StuPass19',
    Gender: 'M',
    Level: 1,
    DOB: '2005-04-18',
    Age: new Date().getFullYear() - 2005,
    CGPA: 3.10,
    Dept_ID: 1,
  },
  {
    Stu_ID: 2020,
    Stu_SSN: '20200000000000',
    FName: 'Shahd',
    LName: 'Mohsen',
    Email: 'shahd.mohsen@fci.edu',
    Username: 'SMohsen',
    Password: 'StuPass20',
    Gender: 'F',
    Level: 2,
    DOB: '2004-09-08',
    Age: new Date().getFullYear() - 2004,
    CGPA: 3.50,
    Dept_ID: 1,
  },
  {
    Stu_ID: 3000,
    Stu_SSN: '30000000000000',
    FName: 'Khaled',
    LName: 'Fawzy',
    Email: 'khaled.fawzy@fci.edu',
    Username: 'KFawzy',
    Password: 'newpass2025',
    Gender: 'M',
    Level: 1,
    DOB: '2006-03-10',
    Age: new Date().getFullYear() - 2006,
    CGPA: 3.10,
    Dept_ID: 1,
  },
];

// Mock Doctors from Faculty_System database
const mockDoctors: Doctor[] = [
  {
    Doc_ID: 10,
    SSN: '12345678901234',
    FName: 'Moatasem',
    LName: 'Draz',
    Email: 'MoataemDraz@fci.edu',
    Username: 'MdRAZ',
    Password: 'pass123',
    Hire_Date: '2023-03-01',
    DOB: '1990-05-15',
    Age: new Date().getFullYear() - 1990,
    Gender: 'M',
    Hour_Rate: 100,
    Hours_Per_Week: 30,
    Salary: 100 * 30 * 4,
    Dept_ID: 3,
    phones: [{ Doc_ID: 10, Phone_NUM: '01012345678' }, { Doc_ID: 10, Phone_NUM: '01298765432' }],
    addresses: [{ Doc_ID: 10, City: 'Giza', Street: 'Nile Street' }],
  },
  {
    Doc_ID: 20,
    SSN: '23456789012345',
    FName: 'Reda',
    LName: 'Mabrouk',
    Email: 'ReadMabrouk@fci.edu',
    Username: 'RmABROUK',
    Password: 'pass456',
    Hire_Date: '2017-01-20',
    DOB: '1985-11-25',
    Age: new Date().getFullYear() - 1985,
    Gender: 'M',
    Hour_Rate: 160,
    Hours_Per_Week: 45,
    Salary: 160 * 45 * 4,
    Dept_ID: 3,
    phones: [{ Doc_ID: 20, Phone_NUM: '01515345271' }],
    addresses: [
      { Doc_ID: 20, City: 'Dosouk', Street: '23 ST' },
      { Doc_ID: 20, City: 'Cairo', Street: 'Maadi Ring Road' },
    ],
  },
  {
    Doc_ID: 30,
    SSN: '34567890123456',
    FName: 'Mai',
    LName: 'Ramadan',
    Email: 'MaiRamadan@fci.edu',
    Username: 'MrAMADAN',
    Password: 'pass789',
    Hire_Date: '2019-07-10',
    DOB: '1990-03-05',
    Age: new Date().getFullYear() - 1990,
    Gender: 'F',
    Hour_Rate: 145,
    Hours_Per_Week: 42,
    Salary: 145 * 42 * 4,
    Dept_ID: 2,
    phones: [{ Doc_ID: 30, Phone_NUM: '01240004000' }],
    addresses: [{ Doc_ID: 30, City: 'Mansoura', Street: '21 ST' }],
  },
  {
    Doc_ID: 40,
    SSN: '12345678901204',
    FName: 'Alaa',
    LName: 'Alakany',
    Email: 'AlaaAlakany@fci.edu',
    Username: 'AaLAKANY',
    Password: 'pass523',
    Hire_Date: '2018-03-01',
    DOB: '1988-05-15',
    Age: new Date().getFullYear() - 1988,
    Gender: 'M',
    Hour_Rate: 100,
    Hours_Per_Week: 30,
    Salary: 100 * 30 * 4,
    Dept_ID: 1,
    phones: [{ Doc_ID: 40, Phone_NUM: '01232098452' }, { Doc_ID: 40, Phone_NUM: '01130003000' }],
    addresses: [
      { Doc_ID: 40, City: 'Alexandria', Street: 'Corniche Road' },
      { Doc_ID: 40, City: 'Cairo', Street: 'Nasr City Avenue' },
    ],
  },
  {
    Doc_ID: 50,
    SSN: '10333333333333',
    FName: 'Tarek',
    LName: 'Mahmoud',
    Email: 'tarek.mahmoud@fci.edu',
    Username: 'TMAHMOUD',
    Password: 'DocPass03',
    Hire_Date: '2018-01-01',
    DOB: '1988-11-03',
    Age: new Date().getFullYear() - 1988,
    Gender: 'M',
    Hour_Rate: 150,
    Hours_Per_Week: 45,
    Salary: 150 * 45 * 4,
    Dept_ID: 3,
  },
  {
    Doc_ID: 60,
    SSN: '10444444444444',
    FName: 'Hala',
    LName: 'Farouk',
    Email: 'hala.farouk@fci.edu',
    Username: 'HFAROUK',
    Password: 'DocPass04',
    Hire_Date: '2019-11-10',
    DOB: '1990-06-18',
    Age: new Date().getFullYear() - 1990,
    Gender: 'F',
    Hour_Rate: 140,
    Hours_Per_Week: 30,
    Salary: 140 * 30 * 4,
    Dept_ID: 1,
  },
  {
    Doc_ID: 70,
    SSN: '10555555555555',
    FName: 'Amr',
    LName: 'Salama',
    Email: 'amr.salama@fci.edu',
    Username: 'ASALAMA',
    Password: 'DocPass05',
    Hire_Date: '2017-03-25',
    DOB: '1982-01-22',
    Age: new Date().getFullYear() - 1982,
    Gender: 'M',
    Hour_Rate: 190,
    Hours_Per_Week: 38,
    Salary: 190 * 38 * 4,
    Dept_ID: 2,
    phones: [{ Doc_ID: 70, Phone_NUM: '01050005000' }, { Doc_ID: 70, Phone_NUM: '01160006000' }],
    addresses: [
      { Doc_ID: 70, City: 'Giza', Street: 'Dokki Square' },
      { Doc_ID: 70, City: 'Sharm El Sheikh', Street: 'Peace Road' },
    ],
  },
  {
    Doc_ID: 80,
    SSN: '10666666666666',
    FName: 'Laila',
    LName: 'Khalil',
    Email: 'laila.khalil@fci.edu',
    Username: 'LKHALIL',
    Password: 'DocPass06',
    Hire_Date: '2021-09-01',
    DOB: '1995-07-14',
    Age: new Date().getFullYear() - 1995,
    Gender: 'F',
    Hour_Rate: 130,
    Hours_Per_Week: 40,
    Salary: 130 * 40 * 4,
    Dept_ID: 1,
    phones: [{ Doc_ID: 80, Phone_NUM: '01080008000' }, { Doc_ID: 80, Phone_NUM: '01190009000' }],
    addresses: [{ Doc_ID: 80, City: 'Luxor', Street: 'Karnak Temple St' }],
  },
  {
    Doc_ID: 90,
    SSN: '10777777777777',
    FName: 'Youssef',
    LName: 'Adel',
    Email: 'youssef.adel@fci.edu',
    Username: 'YADEL',
    Password: 'DocPass07',
    Hire_Date: '2017-04-12',
    DOB: '1984-03-01',
    Age: new Date().getFullYear() - 1984,
    Gender: 'M',
    Hour_Rate: 165,
    Hours_Per_Week: 35,
    Salary: 165 * 35 * 4,
    Dept_ID: 2,
    phones: [{ Doc_ID: 90, Phone_NUM: '01270007000' }],
    addresses: [{ Doc_ID: 90, City: 'Cairo', Street: 'Heliopolis' }],
  },
  {
    Doc_ID: 100,
    SSN: '10888888888888',
    FName: 'Sara',
    LName: 'Mostafa',
    Email: 'sara.mostafa@fci.edu',
    Username: 'SMOSTAFA',
    Password: 'DocPass08',
    Hire_Date: '2016-06-05',
    DOB: '1986-10-29',
    Age: new Date().getFullYear() - 1986,
    Gender: 'F',
    Hour_Rate: 175,
    Hours_Per_Week: 42,
    Salary: 175 * 42 * 4,
    Dept_ID: 3,
    phones: [{ Doc_ID: 100, Phone_NUM: '01010001000' }, { Doc_ID: 100, Phone_NUM: '01020002000' }],
    addresses: [
      { Doc_ID: 100, City: 'Giza', Street: 'Mohandessin Area' },
      { Doc_ID: 100, City: 'Alexandria', Street: 'Smoha Complex' },
    ],
  },
];

// Mock Departments from Faculty_System database
const mockDepartments: Department[] = [
  {
    Dept_ID: 1,
    Dept_Name: 'Computer Science',
    Doc_ID: 40, // Default, will be updated
    Establish_Date: new Date().toISOString().split('T')[0],
  },
  {
    Dept_ID: 2,
    Dept_Name: 'Information Technology',
    Doc_ID: 30,
    Establish_Date: new Date().toISOString().split('T')[0],
  },
  {
    Dept_ID: 3,
    Dept_Name: 'Information System',
    Doc_ID: 20,
    Establish_Date: new Date().toISOString().split('T')[0],
  },
];

// Mock Courses from Faculty_System database
const mockCourses: CourseWithSchedule[] = [
  {
    Crs_ID: 1,
    Crs_Name: 'Database Advanced',
    Discription: 'Advanced topics in Datbase design and managemnt',
    Credit_Hours: 3,
    Doc_ID: 10,
    Dept_ID: 2,
    schedules: [
      {
        Sch_ID: 1,
        Crs_ID: 1,
        Day: 'Sunday',
        Start_Hour: '09:00:00',
        END_Hour: '11:00:00',
        Level: 3,
        Location: 'Hall 03',
      },
      {
        Sch_ID: 3,
        Crs_ID: 1,
        Day: 'Wednesday',
        Start_Hour: '14:00:00',
        END_Hour: '15:30:00',
        Level: 3,
        Location: 'Lab 02',
      },
      {
        Sch_ID: 4,
        Crs_ID: 1,
        Day: 'Sunday',
        Start_Hour: '10:00:00',
        END_Hour: '11:30:00',
        Level: 3,
        Location: 'Lecture Hall A',
      },
      {
        Sch_ID: 5,
        Crs_ID: 1,
        Day: 'Tuesday',
        Start_Hour: '14:00:00',
        END_Hour: '15:30:00',
        Level: 3,
        Location: 'Lab 305',
      },
    ],
    instructor: {
      Doc_ID: 10,
      FName: 'Moatasem',
      LName: 'Draz',
      Email: 'MoataemDraz@fci.edu',
    },
    department: {
      Dept_ID: 2,
      Dept_Name: 'Information Technology',
    },
  },
  {
    Crs_ID: 2,
    Crs_Name: 'Computer Network',
    Discription: 'Introdunction to newtork and protocols mahagement',
    Credit_Hours: 3,
    Doc_ID: 30,
    Dept_ID: 2,
    schedules: [
      {
        Sch_ID: 6,
        Crs_ID: 2,
        Day: 'Monday',
        Start_Hour: '09:30:00',
        END_Hour: '11:00:00',
        Level: 4,
        Location: 'Lecture Hall B',
      },
      {
        Sch_ID: 7,
        Crs_ID: 2,
        Day: 'Wednesday',
        Start_Hour: '13:00:00',
        END_Hour: '14:30:00',
        Level: 4,
        Location: 'Lab 402',
      },
    ],
    instructor: {
      Doc_ID: 30,
      FName: 'Mai',
      LName: 'Ramadan',
      Email: 'MaiRamadan@fci.edu',
    },
    department: {
      Dept_ID: 2,
      Dept_Name: 'Information Technology',
    },
  },
  {
    Crs_ID: 3,
    Crs_Name: 'Software Engineering',
    Discription: 'Introdunction for System and Software Manageing',
    Credit_Hours: 2,
    Doc_ID: 20,
    Dept_ID: 3,
    schedules: [
      {
        Sch_ID: 2,
        Crs_ID: 3,
        Day: 'Tuesday',
        Start_Hour: '11:00:00',
        END_Hour: '13:00:00',
        Level: 4,
        Location: 'Hall 01',
      },
      {
        Sch_ID: 8,
        Crs_ID: 3,
        Day: 'Thursday',
        Start_Hour: '11:00:00',
        END_Hour: '13:00:00',
        Level: 1,
        Location: 'Design Studio 1',
      },
    ],
    instructor: {
      Doc_ID: 20,
      FName: 'Reda',
      LName: 'Mabrouk',
      Email: 'ReadMabrouk@fci.edu',
    },
    department: {
      Dept_ID: 3,
      Dept_Name: 'Information System',
    },
  },
  {
    Crs_ID: 4,
    Crs_Name: 'Data Structures',
    Discription: 'In-depth study of efficient data organization.',
    Credit_Hours: 3,
    Doc_ID: 20,
    Dept_ID: 1,
    schedules: [],
    instructor: {
      Doc_ID: 20,
      FName: 'Reda',
      LName: 'Mabrouk',
      Email: 'ReadMabrouk@fci.edu',
    },
    department: {
      Dept_ID: 1,
      Dept_Name: 'Computer Science',
    },
  },
  {
    Crs_ID: 5,
    Crs_Name: 'Advanced Databases',
    Discription: 'Advanced concepts in database design and optimization.',
    Credit_Hours: 3,
    Doc_ID: 90,
    Dept_ID: 3,
    schedules: [],
    instructor: {
      Doc_ID: 90,
      FName: 'Youssef',
      LName: 'Adel',
      Email: 'youssef.adel@fci.edu',
    },
    department: {
      Dept_ID: 3,
      Dept_Name: 'Information System',
    },
  },
  {
    Crs_ID: 6,
    Crs_Name: 'Machine Learning',
    Discription: 'Introduction to fundamental machine learning algorithms.',
    Credit_Hours: 3,
    Doc_ID: 80,
    Dept_ID: 1,
    schedules: [],
    instructor: {
      Doc_ID: 80,
      FName: 'Laila',
      LName: 'Khalil',
      Email: 'laila.khalil@fci.edu',
    },
    department: {
      Dept_ID: 1,
      Dept_Name: 'Computer Science',
    },
  },
  {
    Crs_ID: 7,
    Crs_Name: 'Cloud Services Management',
    Discription: 'Managing and deploying applications on the cloud platform.',
    Credit_Hours: 3,
    Doc_ID: 50,
    Dept_ID: 1,
    schedules: [],
    instructor: {
      Doc_ID: 50,
      FName: 'Tarek',
      LName: 'Mahmoud',
      Email: 'tarek.mahmoud@fci.edu',
    },
    department: {
      Dept_ID: 1,
      Dept_Name: 'Computer Science',
    },
  },
  {
    Crs_ID: 8,
    Crs_Name: 'Algorithms Analysis',
    Discription: 'Analyzing the complexity of advanced algorithms.',
    Credit_Hours: 3,
    Doc_ID: 20,
    Dept_ID: 1,
    schedules: [],
    instructor: {
      Doc_ID: 20,
      FName: 'Reda',
      LName: 'Mabrouk',
      Email: 'ReadMabrouk@fci.edu',
    },
    department: {
      Dept_ID: 1,
      Dept_Name: 'Computer Science',
    },
  },
  {
    Crs_ID: 9,
    Crs_Name: 'Information Security',
    Discription: 'Principles of protecting systems and data integrity.',
    Credit_Hours: 3,
    Doc_ID: 30,
    Dept_ID: 3,
    schedules: [],
    instructor: {
      Doc_ID: 30,
      FName: 'Mai',
      LName: 'Ramadan',
      Email: 'MaiRamadan@fci.edu',
    },
    department: {
      Dept_ID: 3,
      Dept_Name: 'Information System',
    },
  },
];

// Mock Enrollments from Faculty_System database
const mockEnrollments: Enrollment[] = [
  {
    Stu_ID: 20221,
    Crs_ID: 1,
    Grade: 85,
    Year: '2024-25',
  },
  {
    Stu_ID: 20222,
    Crs_ID: 2,
    Grade: 92,
    Year: '2024-25',
  },
  {
    Stu_ID: 20231,
    Crs_ID: 1,
    Grade: 78,
    Year: '2024-25',
  },
  {
    Stu_ID: 20224,
    Crs_ID: 3,
    Grade: 88,
    Year: '2024-25',
  },
];

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service Class
class ApiService {
  // Backend API base URL (ASP.NET Core)
  // Configure via NEXT_PUBLIC_API_URL, e.g. "https://localhost:7252/api"
  // Defaults are aligned with api/Properties/launchSettings.json
  private baseUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7252/api';

  // Toggle between real API and mock data
  private useMocks = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  // Generic request method (for future real API integration)
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // When using mocks, keep current behavior
    if (this.useMocks) {
      await delay(500); // Simulate network delay
      return this.getMockData<T>(endpoint, options);
    }

    // Real API call to ASP.NET Core backend
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      throw new Error(`API Error ${response.status}: ${message}`);
    }

    return response.json() as Promise<T>;
  }

  private getMockData<T>(endpoint: string, options: RequestInit): T {
    // Parse endpoint to determine what mock data to return
    const method = options.method || 'GET';
    
    if (endpoint.includes('/students')) {
      if (method === 'GET') {
        if (endpoint.includes('/courses')) {
          // Student's enrolled courses
          const studentIdStr = endpoint.split('/')[2];
          const studentId = parseInt(studentIdStr);
          const enrollments = mockEnrollments.filter(e => e.Stu_ID === studentId);
          const courses = enrollments.map(enrollment => {
            const course = mockCourses.find(c => c.Crs_ID === enrollment.Crs_ID);
            return { ...course, enrollment };
          });
          return { data: courses, success: true } as T;
        } else if (endpoint.match(/\/students\/\d+$/)) {
          // Single student
          const studentIdStr = endpoint.split('/').pop();
          const studentId = parseInt(studentIdStr || '0');
          const student = mockStudents.find(s => s.Stu_ID === studentId);
          return { data: student, success: true } as T;
        } else {
          // All students
          return {
            data: mockStudents,
            pagination: {
              page: 1,
              limit: 100,
              total: mockStudents.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      }
    }
    
    if (endpoint.includes('/doctors')) {
      if (method === 'GET') {
        if (endpoint.match(/\/doctors\/\d+$/)) {
          const doctorIdStr = endpoint.split('/').pop();
          const doctorId = parseInt(doctorIdStr || '0');
          const doctor = mockDoctors.find(d => d.Doc_ID === doctorId);
          return { data: doctor, success: true } as T;
        } else {
          return {
            data: mockDoctors,
            pagination: {
              page: 1,
              limit: 100,
              total: mockDoctors.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      }
    }
    
    if (endpoint.includes('/courses')) {
      if (method === 'GET') {
        if (endpoint.match(/\/courses\/\d+$/)) {
          const courseIdStr = endpoint.split('/').pop();
          const courseId = parseInt(courseIdStr || '0');
          const course = mockCourses.find(c => c.Crs_ID === courseId);
          return { data: course, success: true } as T;
        } else {
          return {
            data: mockCourses,
            pagination: {
              page: 1,
              limit: 100,
              total: mockCourses.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      } else if (method === 'POST') {
        // Create course
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newCourse: CourseWithSchedule = {
          Crs_ID: mockCourses.length + 1,
          ...body,
          schedules: [],
        };
        mockCourses.push(newCourse);
        return { data: newCourse, success: true } as T;
      } else if (method === 'DELETE') {
        // Delete course
        const courseIdStr = endpoint.split('/').pop();
        const courseId = parseInt(courseIdStr || '0');
        const index = mockCourses.findIndex(c => c.Crs_ID === courseId);
        if (index !== -1) {
          mockCourses.splice(index, 1);
          return { data: null, success: true } as T;
        }
        return { data: null, success: false, message: 'Course not found' } as T;
      } else if (method === 'PUT') {
        // Update course
        const courseIdStr = endpoint.split('/').pop();
        const courseId = parseInt(courseIdStr || '0');
        const body = options.body ? JSON.parse(options.body as string) : {};
        const index = mockCourses.findIndex(c => c.Crs_ID === courseId);
        if (index !== -1) {
          mockCourses[index] = { ...mockCourses[index], ...body };
          return { data: mockCourses[index], success: true } as T;
        }
        return { data: null, success: false, message: 'Course not found' } as T;
      }
    }
    
    if (endpoint.includes('/departments')) {
      if (method === 'GET') {
        if (endpoint.match(/\/departments\/\d+$/)) {
          const deptIdStr = endpoint.split('/').pop();
          const deptId = parseInt(deptIdStr || '0');
          const dept = mockDepartments.find(d => d.Dept_ID === deptId);
          return { data: dept, success: true } as T;
        } else {
          return {
            data: mockDepartments,
            pagination: {
              page: 1,
              limit: 100,
              total: mockDepartments.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      } else if (method === 'POST') {
        // Create department
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newDept: Department = {
          Dept_ID: mockDepartments.length + 1,
          ...body,
        };
        mockDepartments.push(newDept);
        return { data: newDept, success: true } as T;
      } else if (method === 'DELETE') {
        // Delete department
        const deptIdStr = endpoint.split('/').pop();
        const deptId = parseInt(deptIdStr || '0');
        const index = mockDepartments.findIndex(d => d.Dept_ID === deptId);
        if (index !== -1) {
          mockDepartments.splice(index, 1);
          return { data: null, success: true } as T;
        }
        return { data: null, success: false, message: 'Department not found' } as T;
      } else if (method === 'PUT') {
        // Update department
        const deptIdStr = endpoint.split('/').pop();
        const deptId = parseInt(deptIdStr || '0');
        const body = options.body ? JSON.parse(options.body as string) : {};
        const index = mockDepartments.findIndex(d => d.Dept_ID === deptId);
        if (index !== -1) {
          mockDepartments[index] = { ...mockDepartments[index], ...body };
          return { data: mockDepartments[index], success: true } as T;
        }
        return { data: null, success: false, message: 'Department not found' } as T;
      }
    }
    
    // Default response
    return { data: null, success: false, message: 'Endpoint not found' } as T;
  }

  // Student API methods
  async getStudents(_params?: PaginationParams): Promise<PaginatedResponse<Student>> {
    return this.request<PaginatedResponse<Student>>('/students', {
      method: 'GET',
    });
  }

  async getStudent(id: string): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/students/${id}`);
  }

  async createStudent(data: CreateStudentRequest): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStudent(id: string, data: UpdateStudentRequest): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStudent(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  async getStudentCourses(studentId: string): Promise<ApiResponse<CourseWithSchedule[]>> {
    return this.request<ApiResponse<CourseWithSchedule[]>>(`/students/${studentId}/courses`);
  }

  // Doctor API methods
  async getDoctors(_params?: PaginationParams): Promise<PaginatedResponse<Doctor>> {
    return this.request<PaginatedResponse<Doctor>>('/doctors');
  }

  async getDoctor(id: string): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>(`/doctors/${id}`);
  }

  async createDoctor(data: CreateDoctorRequest): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>('/doctors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDoctor(id: string, data: UpdateDoctorRequest): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDoctor(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/doctors/${id}`, {
      method: 'DELETE',
    });
  }

  // Course API methods
  async getCourses(_params?: PaginationParams): Promise<PaginatedResponse<CourseWithSchedule>> {
    return this.request<PaginatedResponse<CourseWithSchedule>>('/courses');
  }

  async getCourse(id: string): Promise<ApiResponse<CourseWithSchedule>> {
    return this.request<ApiResponse<CourseWithSchedule>>(`/courses/${id}`);
  }

  async createCourse(data: CreateCourseRequest): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCourse(id: string, data: UpdateCourseRequest): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCourse(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Department API methods
  async getDepartments(_params?: PaginationParams): Promise<PaginatedResponse<Department>> {
    return this.request<PaginatedResponse<Department>>('/departments');
  }

  async getDepartment(id: string): Promise<ApiResponse<Department>> {
    return this.request<ApiResponse<Department>>(`/departments/${id}`);
  }

  async createDepartment(data: CreateDepartmentRequest): Promise<ApiResponse<Department>> {
    return this.request<ApiResponse<Department>>('/departments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDepartment(id: string, data: UpdateDepartmentRequest): Promise<ApiResponse<Department>> {
    return this.request<ApiResponse<Department>>(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDepartment(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/departments/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
