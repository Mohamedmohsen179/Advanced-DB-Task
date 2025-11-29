// Course interface matching Faculty_System database schema
export interface Course {
  Crs_ID: number;
  Crs_Name: string;
  Discription: string;
  Credit_Hours: number;
  Doc_ID: number;
  Dept_ID: number;
  Max_Num_Stu?: number;
  // Related data
  schedules?: CourseSchedule[];
  instructor?: {
    Doc_ID: number;
    FName: string;
    LName: string;
    Email: string;
  };
  department?: {
    Dept_ID: number;
    Dept_Name: string;
    Dept_Code?: string;
  };
}

export interface CreateCourseRequest {
  Crs_Name: string;
  Discription: string;
  Credit_Hours: number;
  Doc_ID: number;
  Dept_ID: number;
  Max_Num_Stu?: number;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {}

export interface CourseSchedule {
  Sch_ID: number;
  Crs_ID: number;
  Day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  Start_Hour: string; // time format
  END_Hour: string; // time format
  Level: 1 | 2 | 3 | 4;
  Location?: string;
}

export interface Enrollment {
  Stu_ID: number;
  Crs_ID: number;
  Grade?: number; // 0-100
  Year: string; // e.g., '2024-25'
}

export interface Teach {
  Crs_ID: number;
  Doc_ID: number;
  Semester: string;
}

export interface CourseWithSchedule extends Course {
  schedules: CourseSchedule[];
}
