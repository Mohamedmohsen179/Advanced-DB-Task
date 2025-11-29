export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  headOfDepartmentId?: string;
  establishedDate: string;
  location?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  budget?: number;
  studentCount: number;
  facultyCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentRequest {
  name: string;
  code: string;
  description?: string;
  headOfDepartmentId?: string;
  establishedDate: string;
  location?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  budget?: number;
}

export interface UpdateDepartmentRequest extends Partial<CreateDepartmentRequest> {
  status?: 'active' | 'inactive';
}
