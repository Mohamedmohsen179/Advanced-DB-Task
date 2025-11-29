// Student interface matching Faculty_System database schema
export interface Student {
  Stu_ID: number;
  Stu_SSN: string;
  FName: string;
  LName: string;
  Email: string;
  Username: string;
  Password: string;
  Gender: 'M' | 'F';
  Level: 1 | 2 | 3 | 4;
  DOB: string;
  Age?: number; // Computed field
  CGPA: number;
  Dept_ID: number;
  // Related data
  phones?: StudentPhone[];
  addresses?: StudentAddress[];
  enrollments?: StudentEnrollment[];
}

export interface StudentPhone {
  Stu_ID: number;
  Phone_NUM: string;
}

export interface StudentAddress {
  Stu_ID: number;
  City: string;
  Street: string;
}

export interface CreateStudentRequest {
  Stu_ID: number;
  Stu_SSN: string;
  FName: string;
  LName: string;
  Email: string;
  Username: string;
  Password: string;
  Gender: 'M' | 'F';
  Level: 1 | 2 | 3 | 4;
  DOB: string;
  CGPA: number;
  Dept_ID: number;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {}

export interface StudentEnrollment {
  Stu_ID: number;
  Crs_ID: number;
  Grade?: number; // 0-100
  Year: string; // e.g., '2024-25'
}
