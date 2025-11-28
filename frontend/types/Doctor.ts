export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth: string;
  hireDate: string;
  employeeId: string;
  departmentId: string;
  title: string;
  specialization?: string;
  officeLocation?: string;
  officeHours?: string;
  biography?: string;
  qualifications: string[];
  researchInterests?: string[];
  status: 'active' | 'inactive' | 'on_leave' | 'retired';
  salary?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDoctorRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth: string;
  employeeId: string;
  departmentId: string;
  title: string;
  specialization?: string;
  officeLocation?: string;
  officeHours?: string;
  biography?: string;
  qualifications: string[];
  researchInterests?: string[];
}

export interface UpdateDoctorRequest extends Partial<CreateDoctorRequest> {
  status?: 'active' | 'inactive' | 'on_leave' | 'retired';
  salary?: number;
}
