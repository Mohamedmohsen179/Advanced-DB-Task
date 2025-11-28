export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth: string;
  enrollmentDate: string;
  studentId: string;
  departmentId: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  gpa?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth: string;
  studentId: string;
  departmentId: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  status?: 'active' | 'inactive' | 'graduated' | 'suspended';
  gpa?: number;
}

export interface StudentEnrollment {
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  grade?: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'failed';
}
