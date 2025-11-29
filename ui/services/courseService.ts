// Course service - handles all course-related API calls
import apiClient from './apiClient';
import type { Course, CourseCreate, CourseUpdate } from '@/types';
import { enrollementsApi } from '@/lib/api';
import { courseSchedulesApi } from '@/lib/api';
import type { Enrollement } from '@/types';
import type { CourseSchedule } from '@/types';

export const courseService = {
  // Get all courses
  getAll: async (): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>('/Courses');
    return response.data;
  },

  // Get course by ID
  getById: async (id: number): Promise<Course> => {
    const response = await apiClient.get<Course>(`/Courses/${id}`);
    return response.data;
  },

  // Create new course
  create: async (data: CourseCreate): Promise<Course> => {
    const response = await apiClient.post<Course>('/Courses', data);
    return response.data;
  },

  // Update course
  update: async (id: number, data: CourseUpdate): Promise<void> => {
    await apiClient.put(`/Courses/${id}`, data);
  },

  // Delete course
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Courses/${id}`);
  },

  // Get count of courses
  getCount: async (): Promise<number> => {
    const courses = await courseService.getAll();
    return courses.length;
  },

  // Get all students enrolled in a course
  getStudentsByCourse: async (crsId: number): Promise<Enrollement[]> => {
    const enrollements = await enrollementsApi.getAll();
    return enrollements.filter((e) => e.crsId === crsId);
  },

  // Get all schedules of a course
  getSchedulesByCourse: async (crsId: number): Promise<CourseSchedule[]> => {
    const schedules = await courseSchedulesApi.getAll();
    return schedules.filter((s) => s.crsId === crsId);
  },
};

