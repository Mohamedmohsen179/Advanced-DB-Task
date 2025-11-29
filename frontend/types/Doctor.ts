// Doctor interface matching Faculty_System database schema
export interface Doctor {
  Doc_ID: number;
  SSN: string;
  FName: string;
  LName: string;
  Email: string;
  Username: string;
  Password: string;
  Hire_Date: string;
  DOB: string;
  Age?: number; // Computed field
  Gender: 'M' | 'F';
  Hour_Rate: number;
  Hours_Per_Week: number;
  Salary?: number; // Computed field: Hour_Rate * Hours_Per_Week * 4
  Dept_ID: number;
  // Related data
  phones?: DoctorPhone[];
  addresses?: DoctorAddress[];
  courses?: number[]; // Course IDs
}

export interface DoctorPhone {
  Doc_ID: number;
  Phone_NUM: string;
}

export interface DoctorAddress {
  Doc_ID: number;
  City: string;
  Street: string;
}

export interface CreateDoctorRequest {
  Doc_ID: number;
  SSN: string;
  FName: string;
  LName: string;
  Email: string;
  Username: string;
  Password: string;
  Hire_Date: string;
  DOB: string;
  Gender: 'M' | 'F';
  Hour_Rate: number;
  Hours_Per_Week: number;
  Dept_ID: number;
}

export interface UpdateDoctorRequest extends Partial<CreateDoctorRequest> {}
