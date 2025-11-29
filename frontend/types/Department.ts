// Department interface matching Faculty_System database schema
export interface Department {
  Dept_ID: number;
  Dept_Name: string;
  Doc_ID: number; // Head of department (Doctor ID)
  Establish_Date: string;
  Location?: string;
  Dept_Description?: string;
  Dept_Code?: string;
  // Related data
  headDoctor?: {
    Doc_ID: number;
    FName: string;
    LName: string;
    Email: string;
  };
}

export interface CreateDepartmentRequest {
  Dept_ID: number;
  Dept_Name: string;
  Doc_ID: number;
  Establish_Date: string;
  Location?: string;
  Dept_Description?: string;
  Dept_Code?: string;
}

export interface UpdateDepartmentRequest extends Partial<CreateDepartmentRequest> {}
