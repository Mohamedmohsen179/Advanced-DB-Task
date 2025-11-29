// Doctor service - handles all doctor-related API calls
import apiClient from './apiClient';
import type { Doctor, DoctorCreate, DoctorUpdate } from '@/types';

export const doctorService = {
  // Get all doctors
  getAll: async (): Promise<Doctor[]> => {
    const response = await apiClient.get<Doctor[]>('/Doctors');
    return response.data;
  },

  // Get doctor by ID
  getById: async (id: number): Promise<Doctor> => {
    const response = await apiClient.get<Doctor>(`/Doctors/${id}`);
    return response.data;
  },

  // Create new doctor
  create: async (data: DoctorCreate): Promise<Doctor> => {
    const response = await apiClient.post<Doctor>('/Doctors', data);
    return response.data;
  },

  // Update doctor
  update: async (id: number, data: DoctorUpdate): Promise<void> => {
    await apiClient.put(`/Doctors/${id}`, data);
  },

  // Delete doctor
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Doctors/${id}`);
  },

  // Get count of doctors
  getCount: async (): Promise<number> => {
    const doctors = await doctorService.getAll();
    return doctors.length;
  },

  // Get doctors by department
  getByDepartment: async (deptId: number): Promise<Doctor[]> => {
    const doctors = await doctorService.getAll();
    return doctors.filter((d) => d.deptId === deptId);
  },
};

