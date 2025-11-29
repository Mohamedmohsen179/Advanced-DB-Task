// Schedule service - handles all course schedule-related API calls
import apiClient from './apiClient';
import type { CourseSchedule, CourseScheduleCreate, CourseScheduleUpdate } from '@/types';

export const scheduleService = {
  // Get all schedules
  getAll: async (): Promise<CourseSchedule[]> => {
    const response = await apiClient.get<CourseSchedule[]>('/CourseSchedules');
    return response.data;
  },

  // Get schedule by ID
  getById: async (id: number): Promise<CourseSchedule> => {
    const response = await apiClient.get<CourseSchedule>(`/CourseSchedules/${id}`);
    return response.data;
  },

  // Create new schedule
  create: async (data: CourseScheduleCreate): Promise<CourseSchedule> => {
    const response = await apiClient.post<CourseSchedule>('/CourseSchedules', data);
    return response.data;
  },

  // Update schedule
  update: async (id: number, data: CourseScheduleUpdate): Promise<void> => {
    await apiClient.put(`/CourseSchedules/${id}`, data);
  },

  // Delete schedule
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/CourseSchedules/${id}`);
  },

  // Get count of schedules
  getCount: async (): Promise<number> => {
    const schedules = await scheduleService.getAll();
    return schedules.length;
  },
};

