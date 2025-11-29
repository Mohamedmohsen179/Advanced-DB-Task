// Central API service using Axios
// Handles all API endpoints and provides typed methods for CRUD operations

import axios from 'axios';
import type {
  Student,
  StudentCreate,
  StudentUpdate,
  Doctor,
  DoctorCreate,
  DoctorUpdate,
  Course,
  CourseCreate,
  CourseUpdate,
  Departement,
  DepartementCreate,
  DepartementUpdate,
  CourseSchedule,
  CourseScheduleCreate,
  CourseScheduleUpdate,
  Enrollement,
  EnrollementCreate,
  EnrollementUpdate,
  Teach,
  TeachCreate,
  TeachUpdate,
  DoctorAddress,
  DoctorAddressCreate,
  DoctorAddressUpdate,
  DoctorPhone,
  DoctorPhoneCreate,
  DoctorPhoneUpdate,
  DoctorRateAudit,
  DoctorRateAuditCreate,
  DoctorRateAuditUpdate,
  StudentAddress,
  StudentAddressCreate,
  StudentAddressUpdate,
  StudentPhone,
  StudentPhoneCreate,
  StudentPhoneUpdate,
} from '@/types';

// Configure axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5194/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error(`Network Error: Cannot connect to API at ${api.defaults.baseURL}. Ensure the backend is running.`);
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

// ==================== Students API ====================
export const studentsApi = {
  getAll: async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/Students');
    return response.data;
  },
  getById: async (id: number): Promise<Student> => {
    const response = await api.get<Student>(`/Students/${id}`);
    return response.data;
  },
  create: async (data: StudentCreate): Promise<Student> => {
    const response = await api.post<Student>('/Students', data);
    return response.data;
  },
  update: async (id: number, data: StudentUpdate): Promise<void> => {
    await api.put(`/Students/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Students/${id}`);
  },
};

// ==================== Doctors API ====================
export const doctorsApi = {
  getAll: async (): Promise<Doctor[]> => {
    const response = await api.get<Doctor[]>('/Doctors');
    return response.data;
  },
  getById: async (id: number): Promise<Doctor> => {
    const response = await api.get<Doctor>(`/Doctors/${id}`);
    return response.data;
  },
  create: async (data: DoctorCreate): Promise<Doctor> => {
    const response = await api.post<Doctor>('/Doctors', data);
    return response.data;
  },
  update: async (id: number, data: DoctorUpdate): Promise<void> => {
    await api.put(`/Doctors/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Doctors/${id}`);
  },
};

// ==================== Courses API ====================
export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    const response = await api.get<Course[]>('/Courses');
    return response.data;
  },
  getById: async (id: number): Promise<Course> => {
    const response = await api.get<Course>(`/Courses/${id}`);
    return response.data;
  },
  create: async (data: CourseCreate): Promise<Course> => {
    const response = await api.post<Course>('/Courses', data);
    return response.data;
  },
  update: async (id: number, data: CourseUpdate): Promise<void> => {
    await api.put(`/Courses/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Courses/${id}`);
  },
};

// ==================== Departements API ====================
export const departementsApi = {
  getAll: async (): Promise<Departement[]> => {
    const response = await api.get<Departement[]>('/Departements');
    return response.data;
  },
  getById: async (id: number): Promise<Departement> => {
    const response = await api.get<Departement>(`/Departements/${id}`);
    return response.data;
  },
  create: async (data: DepartementCreate): Promise<Departement> => {
    const response = await api.post<Departement>('/Departements', data);
    return response.data;
  },
  update: async (id: number, data: DepartementUpdate): Promise<void> => {
    await api.put(`/Departements/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Departements/${id}`);
  },
};

// ==================== CourseSchedules API ====================
export const courseSchedulesApi = {
  getAll: async (): Promise<CourseSchedule[]> => {
    const response = await api.get<CourseSchedule[]>('/CourseSchedules');
    return response.data;
  },
  getById: async (id: number): Promise<CourseSchedule> => {
    const response = await api.get<CourseSchedule>(`/CourseSchedules/${id}`);
    return response.data;
  },
  create: async (data: CourseScheduleCreate): Promise<CourseSchedule> => {
    const response = await api.post<CourseSchedule>('/CourseSchedules', data);
    return response.data;
  },
  update: async (id: number, data: CourseScheduleUpdate): Promise<void> => {
    await api.put(`/CourseSchedules/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/CourseSchedules/${id}`);
  },
};

// ==================== Enrollements API ====================
export const enrollementsApi = {
  getAll: async (): Promise<Enrollement[]> => {
    const response = await api.get<Enrollement[]>('/Enrollements');
    return response.data;
  },
  getById: async (id: number): Promise<Enrollement> => {
    const response = await api.get<Enrollement>(`/Enrollements/${id}`);
    return response.data;
  },
  create: async (data: EnrollementCreate): Promise<Enrollement> => {
    const response = await api.post<Enrollement>('/Enrollements', data);
    return response.data;
  },
  update: async (id: number, data: EnrollementUpdate): Promise<void> => {
    await api.put(`/Enrollements/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Enrollements/${id}`);
  },
};

// ==================== Teaches API ====================
export const teachesApi = {
  getAll: async (): Promise<Teach[]> => {
    const response = await api.get<Teach[]>('/Teaches');
    return response.data;
  },
  getById: async (id: number): Promise<Teach> => {
    const response = await api.get<Teach>(`/Teaches/${id}`);
    return response.data;
  },
  create: async (data: TeachCreate): Promise<Teach> => {
    const response = await api.post<Teach>('/Teaches', data);
    return response.data;
  },
  update: async (id: number, data: TeachUpdate): Promise<void> => {
    await api.put(`/Teaches/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/Teaches/${id}`);
  },
};

// ==================== DoctorAddresses API ====================
export const doctorAddressesApi = {
  getAll: async (): Promise<DoctorAddress[]> => {
    const response = await api.get<DoctorAddress[]>('/DoctorAddresses');
    return response.data;
  },
  getById: async (id: number): Promise<DoctorAddress> => {
    const response = await api.get<DoctorAddress>(`/DoctorAddresses/${id}`);
    return response.data;
  },
  create: async (data: DoctorAddressCreate): Promise<DoctorAddress> => {
    const response = await api.post<DoctorAddress>('/DoctorAddresses', data);
    return response.data;
  },
  update: async (id: number, data: DoctorAddressUpdate): Promise<void> => {
    await api.put(`/DoctorAddresses/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/DoctorAddresses/${id}`);
  },
};

// ==================== DoctorPhones API ====================
export const doctorPhonesApi = {
  getAll: async (): Promise<DoctorPhone[]> => {
    const response = await api.get<DoctorPhone[]>('/DoctorPhones');
    return response.data;
  },
  getById: async (id: number): Promise<DoctorPhone> => {
    const response = await api.get<DoctorPhone>(`/DoctorPhones/${id}`);
    return response.data;
  },
  create: async (data: DoctorPhoneCreate): Promise<DoctorPhone> => {
    const response = await api.post<DoctorPhone>('/DoctorPhones', data);
    return response.data;
  },
  update: async (id: number, data: DoctorPhoneUpdate): Promise<void> => {
    await api.put(`/DoctorPhones/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/DoctorPhones/${id}`);
  },
};

// ==================== DoctorRateAudits API ====================
export const doctorRateAuditsApi = {
  getAll: async (): Promise<DoctorRateAudit[]> => {
    const response = await api.get<DoctorRateAudit[]>('/DoctorRateAudits');
    return response.data;
  },
  getById: async (id: number): Promise<DoctorRateAudit> => {
    const response = await api.get<DoctorRateAudit>(`/DoctorRateAudits/${id}`);
    return response.data;
  },
  create: async (data: DoctorRateAuditCreate): Promise<DoctorRateAudit> => {
    const response = await api.post<DoctorRateAudit>('/DoctorRateAudits', data);
    return response.data;
  },
  update: async (id: number, data: DoctorRateAuditUpdate): Promise<void> => {
    await api.put(`/DoctorRateAudits/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/DoctorRateAudits/${id}`);
  },
};

// ==================== StudentAddresses API ====================
export const studentAddressesApi = {
  getAll: async (): Promise<StudentAddress[]> => {
    const response = await api.get<StudentAddress[]>('/StudentAddresses');
    return response.data;
  },
  getById: async (id: number): Promise<StudentAddress> => {
    const response = await api.get<StudentAddress>(`/StudentAddresses/${id}`);
    return response.data;
  },
  create: async (data: StudentAddressCreate): Promise<StudentAddress> => {
    const response = await api.post<StudentAddress>('/StudentAddresses', data);
    return response.data;
  },
  update: async (id: number, data: StudentAddressUpdate): Promise<void> => {
    await api.put(`/StudentAddresses/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/StudentAddresses/${id}`);
  },
};

// ==================== StudentPhones API ====================
export const studentPhonesApi = {
  getAll: async (): Promise<StudentPhone[]> => {
    const response = await api.get<StudentPhone[]>('/StudentPhones');
    return response.data;
  },
  getById: async (id: number): Promise<StudentPhone> => {
    const response = await api.get<StudentPhone>(`/StudentPhones/${id}`);
    return response.data;
  },
  create: async (data: StudentPhoneCreate): Promise<StudentPhone> => {
    const response = await api.post<StudentPhone>('/StudentPhones', data);
    return response.data;
  },
  update: async (id: number, data: StudentPhoneUpdate): Promise<void> => {
    await api.put(`/StudentPhones/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/StudentPhones/${id}`);
  },
};

export default api;

