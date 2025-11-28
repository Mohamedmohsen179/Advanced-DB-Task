export interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  departmentId: string;
  instructorId: string;
  semester: 'fall' | 'spring' | 'summer' | 'winter';
  year: number;
  maxStudents: number;
  enrolledStudents: number;
  prerequisites?: string[];
  syllabus?: string;
  status: 'active' | 'inactive' | 'cancelled';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseRequest {
  name: string;
  code: string;
  description?: string;
  credits: number;
  departmentId: string;
  instructorId: string;
  semester: 'fall' | 'spring' | 'summer' | 'winter';
  year: number;
  maxStudents: number;
  prerequisites?: string[];
  syllabus?: string;
  startDate: string;
  endDate: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  status?: 'active' | 'inactive' | 'cancelled';
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  location: string;
  roomNumber?: string;
  building?: string;
  scheduleType: 'lecture' | 'lab' | 'tutorial' | 'seminar';
}

export interface CourseWithSchedule extends Course {
  schedules: CourseSchedule[];
  instructor?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  department?: {
    id: string;
    name: string;
    code: string;
  };
}
