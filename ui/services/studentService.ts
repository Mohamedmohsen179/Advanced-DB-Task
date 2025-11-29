// Student service - handles all student-related API calls
import apiClient from './apiClient';
import type { Student, StudentCreate, StudentUpdate } from '@/types';

export const studentService = {
  // Get all students
  getAll: async (): Promise<Student[]> => {
    const response = await apiClient.get<Student[]>('/Students');
    return response.data;
  },

  // Get student by ID
  getById: async (id: number): Promise<Student> => {
    const response = await apiClient.get<Student>(`/Students/${id}`);
    return response.data;
  },

  // Create new student
  create: async (data: StudentCreate): Promise<Student> => {
    const response = await apiClient.post<Student>('/Students', data);
    return response.data;
  },

  // Update student
  update: async (id: number, data: StudentUpdate): Promise<void> => {
    await apiClient.put(`/Students/${id}`, data);
  },

  // Delete student
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Students/${id}`);
  },

  // Get count of students
  getCount: async (): Promise<number> => {
    const students = await studentService.getAll();
    return students.length;
  },
};

