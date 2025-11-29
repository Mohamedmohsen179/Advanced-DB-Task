// Department service - handles all department-related API calls
import apiClient from './apiClient';
import type { Departement, DepartementCreate, DepartementUpdate } from '@/types';
import { studentService } from './studentService';
import { doctorService } from './doctorService';
import type { Student } from '@/types';
import type { Doctor } from '@/types';

export const departmentService = {
  // Get all departments
  getAll: async (): Promise<Departement[]> => {
    const response = await apiClient.get<Departement[]>('/Departements');
    return response.data;
  },

  // Get department by ID
  getById: async (id: number): Promise<Departement> => {
    const response = await apiClient.get<Departement>(`/Departements/${id}`);
    return response.data;
  },

  // Create new department
  create: async (data: DepartementCreate): Promise<Departement> => {
    const response = await apiClient.post<Departement>('/Departements', data);
    return response.data;
  },

  // Update department
  update: async (id: number, data: DepartementUpdate): Promise<void> => {
    await apiClient.put(`/Departements/${id}`, data);
  },

  // Delete department
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Departements/${id}`);
  },

  // Get count of departments
  getCount: async (): Promise<number> => {
    const departments = await departmentService.getAll();
    return departments.length;
  },

  // Get all doctors in a department
  getDoctorsByDepartment: async (deptId: number): Promise<Doctor[]> => {
    return await doctorService.getByDepartment(deptId);
  },

  // Get all students in a department
  getStudentsByDepartment: async (deptId: number): Promise<Student[]> => {
    const students = await studentService.getAll();
    return students.filter((s) => s.deptId === deptId);
  },
};

