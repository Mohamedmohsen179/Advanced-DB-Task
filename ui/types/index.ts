// TypeScript types/interfaces for all entities matching the backend DTOs

export interface Student {
  stuId: number;
  stuSsn: string;
  fname: string;
  lname: string;
  email: string;
  username: string;
  gender: string;
  level: number;
  dob: string; // DateOnly from backend
  age: number;
  cgpa: number;
  deptId: number;
}

export interface StudentCreate {
  stuSsn: string;
  fname: string;
  lname: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  level: number;
  dob: string;
  deptId: number;
}

export interface StudentUpdate {
  fname: string;
  lname: string;
  email: string;
  username: string;
  gender: string;
  level: number;
  cgpa: number;
  deptId: number;
}

export interface Doctor {
  docId: number;
  ssn: string;
  fname: string;
  lname: string;
  email: string;
  username: string;
  hireDate: string | null;
  dob: string | null;
  age: number | null;
  gender: string | null;
  hourRate: number | null;
  hoursPerWeek: number | null;
  salary: number | null;
  deptId: number;
}

export interface DoctorCreate {
  ssn: string;
  fname: string;
  lname: string;
  email: string;
  username: string;
  password: string;
  hireDate: string | null;
  dob: string | null;
  gender: string | null;
  hourRate: number | null;
  hoursPerWeek: number | null;
  salary: number | null;
  deptId: number;
}

export interface DoctorUpdate {
  fname: string;
  lname: string;
  email: string;
  username: string;
  hireDate: string | null;
  dob: string | null;
  gender: string | null;
  hourRate: number | null;
  hoursPerWeek: number | null;
  salary: number | null;
  deptId: number;
}

export interface Course {
  crsId: number;
  crsName: string;
  discription: string;
  creditHours: number;
  docId: number;
  deptId: number;
}

export interface CourseCreate {
  crsName: string;
  discription: string;
  creditHours: number;
  docId: number;
  deptId: number;
}

export interface CourseUpdate {
  crsName: string;
  discription: string;
  creditHours: number;
  docId: number;
  deptId: number;
}

export interface Departement {
  deptId: number;
  deptName: string;
  docId: number | null;
}

export interface DepartementCreate {
  deptName: string;
  docId: number | null;
}

export interface DepartementUpdate {
  deptName: string;
  docId: number | null;
}

export interface CourseSchedule {
  schId: number;
  crsId: number;
  day: string;
  startHour: string; // TimeOnly from backend
  endHour: string; // TimeOnly from backend
  level: number | null;
  location: string | null;
}

export interface CourseScheduleCreate {
  crsId: number;
  day: string;
  startHour: string;
  endHour: string;
  level: number | null;
  location: string | null;
}

export interface CourseScheduleUpdate {
  day: string;
  startHour: string;
  endHour: string;
  level: number | null;
  location: string | null;
}

export interface Enrollement {
  stuId: number;
  crsId: number;
  grade: number | null;
  year: string;
}

export interface EnrollementCreate {
  stuId: number;
  crsId: number;
  grade: number | null;
  year: string;
}

export interface EnrollementUpdate {
  grade: number | null;
  year: string;
}

export interface Teach {
  crsId: number;
  docId: number;
  semester: string;
}

export interface TeachCreate {
  crsId: number;
  docId: number;
  semester: string;
}

export interface TeachUpdate {
  semester: string;
}

export interface DoctorAddress {
  addrId: number;
  docId: number;
  city: string;
  street: string;
}

export interface DoctorAddressCreate {
  docId: number;
  city: string;
  street: string;
}

export interface DoctorAddressUpdate {
  city: string;
  street: string;
}

export interface DoctorPhone {
  phoneId: number;
  docId: number;
  phoneNum: string;
}

export interface DoctorPhoneCreate {
  docId: number;
  phoneNum: string;
}

export interface DoctorPhoneUpdate {
  phoneNum: string;
}

export interface DoctorRateAudit {
  auditId: number;
  docId: number;
  oldRate: number | null;
  newRate: number | null;
  changeDate: string | null;
  changedBy: string | null;
}

export interface DoctorRateAuditCreate {
  docId: number;
  oldRate: number | null;
  newRate: number | null;
  changeDate: string | null;
  changedBy: string | null;
}

export interface DoctorRateAuditUpdate {
  oldRate: number | null;
  newRate: number | null;
  changeDate: string | null;
  changedBy: string | null;
}

export interface StudentAddress {
  addrId: number;
  stuId: number;
  city: string;
  street: string;
}

export interface StudentAddressCreate {
  stuId: number;
  city: string;
  street: string;
}

export interface StudentAddressUpdate {
  city: string;
  street: string;
}

export interface StudentPhone {
  phoneId: number;
  stuId: number;
  phoneNum: string;
}

export interface StudentPhoneCreate {
  stuId: number;
  phoneNum: string;
}

export interface StudentPhoneUpdate {
  phoneNum: string;
}

