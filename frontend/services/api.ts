import {
  Student,
  Doctor,
  Department,
  Course,
  CourseWithSchedule,
  StudentEnrollment,
  CreateStudentRequest,
  UpdateStudentRequest,
  CreateDoctorRequest,
  UpdateDoctorRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  PaginatedResponse,
  ApiResponse,
  PaginationParams,
} from '../types';

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phoneNumber: '+1-555-0101',
    dateOfBirth: '2000-05-15',
    enrollmentDate: '2022-09-01',
    studentId: 'STU001',
    departmentId: '1',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA',
    },
    status: 'active',
    gpa: 3.75,
    createdAt: '2022-09-01T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@university.edu',
    phoneNumber: '+1-555-0102',
    dateOfBirth: '1999-12-03',
    enrollmentDate: '2021-09-01',
    studentId: 'STU002',
    departmentId: '2',
    address: {
      street: '456 Oak Ave',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702',
      country: 'USA',
    },
    status: 'active',
    gpa: 3.92,
    createdAt: '2021-09-01T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@university.edu',
    phoneNumber: '+1-555-0103',
    dateOfBirth: '2001-08-22',
    enrollmentDate: '2023-01-15',
    studentId: 'STU003',
    departmentId: '1',
    status: 'active',
    gpa: 3.45,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
];

const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'Dr. Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@university.edu',
    phoneNumber: '+1-555-0201',
    dateOfBirth: '1975-03-10',
    hireDate: '2005-08-15',
    employeeId: 'EMP001',
    departmentId: '1',
    title: 'Professor',
    specialization: 'Computer Science',
    officeLocation: 'Building A, Room 301',
    officeHours: 'Mon-Wed 2:00-4:00 PM',
    biography: 'Dr. Wilson specializes in artificial intelligence and machine learning.',
    qualifications: ['Ph.D. Computer Science - MIT', 'M.S. Computer Science - Stanford'],
    researchInterests: ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
    status: 'active',
    salary: 95000,
    createdAt: '2005-08-15T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
  {
    id: '2',
    firstName: 'Dr. Robert',
    lastName: 'Brown',
    email: 'robert.brown@university.edu',
    phoneNumber: '+1-555-0202',
    dateOfBirth: '1968-11-25',
    hireDate: '2000-01-10',
    employeeId: 'EMP002',
    departmentId: '2',
    title: 'Associate Professor',
    specialization: 'Mathematics',
    officeLocation: 'Building B, Room 205',
    officeHours: 'Tue-Thu 1:00-3:00 PM',
    biography: 'Dr. Brown is an expert in applied mathematics and statistical analysis.',
    qualifications: ['Ph.D. Mathematics - Harvard', 'M.S. Statistics - UC Berkeley'],
    researchInterests: ['Statistical Modeling', 'Data Analysis', 'Mathematical Optimization'],
    status: 'active',
    salary: 85000,
    createdAt: '2000-01-10T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
];

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    description: 'Department of Computer Science and Engineering',
    headOfDepartmentId: '1',
    establishedDate: '1985-01-01',
    location: 'Building A',
    phoneNumber: '+1-555-0301',
    email: 'cs@university.edu',
    website: 'https://cs.university.edu',
    budget: 2500000,
    studentCount: 450,
    facultyCount: 25,
    status: 'active',
    createdAt: '1985-01-01T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mathematics',
    code: 'MATH',
    description: 'Department of Mathematics and Statistics',
    headOfDepartmentId: '2',
    establishedDate: '1970-01-01',
    location: 'Building B',
    phoneNumber: '+1-555-0302',
    email: 'math@university.edu',
    website: 'https://math.university.edu',
    budget: 1800000,
    studentCount: 320,
    facultyCount: 18,
    status: 'active',
    createdAt: '1970-01-01T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
];

const mockCourses: CourseWithSchedule[] = [
  {
    id: '1',
    name: 'Introduction to Programming',
    code: 'CS101',
    description: 'Basic programming concepts using Python',
    credits: 3,
    departmentId: '1',
    instructorId: '1',
    semester: 'fall',
    year: 2024,
    maxStudents: 30,
    enrolledStudents: 25,
    prerequisites: [],
    syllabus: 'Variables, functions, loops, data structures',
    status: 'active',
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
    schedules: [
      {
        id: '1',
        courseId: '1',
        dayOfWeek: 'monday',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Building A, Room 101',
        roomNumber: '101',
        building: 'Building A',
        scheduleType: 'lecture',
      },
      {
        id: '2',
        courseId: '1',
        dayOfWeek: 'wednesday',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Building A, Room 101',
        roomNumber: '101',
        building: 'Building A',
        scheduleType: 'lecture',
      },
    ],
    instructor: {
      id: '1',
      firstName: 'Dr. Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@university.edu',
    },
    department: {
      id: '1',
      name: 'Computer Science',
      code: 'CS',
    },
  },
  {
    id: '2',
    name: 'Calculus I',
    code: 'MATH101',
    description: 'Introduction to differential calculus',
    credits: 4,
    departmentId: '2',
    instructorId: '2',
    semester: 'fall',
    year: 2024,
    maxStudents: 40,
    enrolledStudents: 35,
    prerequisites: [],
    syllabus: 'Limits, derivatives, applications of derivatives',
    status: 'active',
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
    schedules: [
      {
        id: '3',
        courseId: '2',
        dayOfWeek: 'tuesday',
        startTime: '11:00',
        endTime: '12:30',
        location: 'Building B, Room 201',
        roomNumber: '201',
        building: 'Building B',
        scheduleType: 'lecture',
      },
      {
        id: '4',
        courseId: '2',
        dayOfWeek: 'thursday',
        startTime: '11:00',
        endTime: '12:30',
        location: 'Building B, Room 201',
        roomNumber: '201',
        building: 'Building B',
        scheduleType: 'lecture',
      },
    ],
    instructor: {
      id: '2',
      firstName: 'Dr. Robert',
      lastName: 'Brown',
      email: 'robert.brown@university.edu',
    },
    department: {
      id: '2',
      name: 'Mathematics',
      code: 'MATH',
    },
  },
];

const mockStudentEnrollments: StudentEnrollment[] = [
  {
    studentId: '1',
    courseId: '1',
    enrollmentDate: '2024-08-15',
    grade: 'A-',
    status: 'enrolled',
  },
  {
    studentId: '1',
    courseId: '2',
    enrollmentDate: '2024-08-15',
    grade: 'B+',
    status: 'enrolled',
  },
  {
    studentId: '2',
    courseId: '1',
    enrollmentDate: '2024-08-15',
    grade: 'A',
    status: 'enrolled',
  },
];

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service Class
class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  // Generic request method (for future real API integration)
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // For now, we'll use mock data, but this structure is ready for real API
    await delay(500); // Simulate network delay
    
    // This is where real API calls would go:
    // const response = await fetch(`${this.baseUrl}${endpoint}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     ...options.headers,
    //   },
    //   ...options,
    // });
    // 
    // if (!response.ok) {
    //   throw new Error(`API Error: ${response.statusText}`);
    // }
    // 
    // return response.json();
    
    // For now, return mock data based on endpoint
    return this.getMockData<T>(endpoint, options);
  }

  private getMockData<T>(endpoint: string, options: RequestInit): T {
    // Parse endpoint to determine what mock data to return
    const method = options.method || 'GET';
    
    if (endpoint.includes('/students')) {
      if (method === 'GET') {
        if (endpoint.includes('/courses')) {
          // Student's enrolled courses
          const studentId = endpoint.split('/')[2];
          const enrollments = mockStudentEnrollments.filter(e => e.studentId === studentId);
          const courses = enrollments.map(enrollment => {
            const course = mockCourses.find(c => c.id === enrollment.courseId);
            return { ...course, enrollment };
          });
          return { data: courses, success: true } as T;
        } else if (endpoint.match(/\/students\/\d+$/)) {
          // Single student
          const studentId = endpoint.split('/').pop();
          const student = mockStudents.find(s => s.id === studentId);
          return { data: student, success: true } as T;
        } else {
          // All students
          return {
            data: mockStudents,
            pagination: {
              page: 1,
              limit: 10,
              total: mockStudents.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      }
    }
    
    if (endpoint.includes('/doctors')) {
      if (method === 'GET') {
        if (endpoint.match(/\/doctors\/\d+$/)) {
          const doctorId = endpoint.split('/').pop();
          const doctor = mockDoctors.find(d => d.id === doctorId);
          return { data: doctor, success: true } as T;
        } else {
          return {
            data: mockDoctors,
            pagination: {
              page: 1,
              limit: 10,
              total: mockDoctors.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      }
    }
    
    if (endpoint.includes('/courses')) {
      if (method === 'GET') {
        if (endpoint.match(/\/courses\/\d+$/)) {
          const courseId = endpoint.split('/').pop();
          const course = mockCourses.find(c => c.id === courseId);
          return { data: course, success: true } as T;
        } else {
          return {
            data: mockCourses,
            pagination: {
              page: 1,
              limit: 10,
              total: mockCourses.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      } else if (method === 'POST') {
        // Create course
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newCourse: CourseWithSchedule = {
          id: String(mockCourses.length + 1),
          ...body,
          enrolledStudents: 0,
          status: 'active',
          schedules: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockCourses.push(newCourse);
        return { data: newCourse, success: true } as T;
      } else if (method === 'DELETE') {
        // Delete course
        const courseId = endpoint.split('/').pop();
        const index = mockCourses.findIndex(c => c.id === courseId);
        if (index !== -1) {
          mockCourses.splice(index, 1);
          return { data: null, success: true } as T;
        }
        return { data: null, success: false, message: 'Course not found' } as T;
      } else if (method === 'PUT') {
        // Update course
        const courseId = endpoint.split('/').pop();
        const body = options.body ? JSON.parse(options.body as string) : {};
        const index = mockCourses.findIndex(c => c.id === courseId);
        if (index !== -1) {
          mockCourses[index] = { ...mockCourses[index], ...body, updatedAt: new Date().toISOString() };
          return { data: mockCourses[index], success: true } as T;
        }
        return { data: null, success: false, message: 'Course not found' } as T;
      }
    }
    
    if (endpoint.includes('/departments')) {
      if (method === 'GET') {
        if (endpoint.match(/\/departments\/\d+$/)) {
          const deptId = endpoint.split('/').pop();
          const dept = mockDepartments.find(d => d.id === deptId);
          return { data: dept, success: true } as T;
        } else {
          return {
            data: mockDepartments,
            pagination: {
              page: 1,
              limit: 10,
              total: mockDepartments.length,
              totalPages: 1,
            },
            success: true,
          } as T;
        }
      } else if (method === 'POST') {
        // Create department
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newDept: Department = {
          id: String(mockDepartments.length + 1),
          ...body,
          studentCount: 0,
          facultyCount: 0,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockDepartments.push(newDept);
        return { data: newDept, success: true } as T;
      } else if (method === 'DELETE') {
        // Delete department
        const deptId = endpoint.split('/').pop();
        const index = mockDepartments.findIndex(d => d.id === deptId);
        if (index !== -1) {
          mockDepartments.splice(index, 1);
          return { data: null, success: true } as T;
        }
        return { data: null, success: false, message: 'Department not found' } as T;
      } else if (method === 'PUT') {
        // Update department
        const deptId = endpoint.split('/').pop();
        const body = options.body ? JSON.parse(options.body as string) : {};
        const index = mockDepartments.findIndex(d => d.id === deptId);
        if (index !== -1) {
          mockDepartments[index] = { ...mockDepartments[index], ...body, updatedAt: new Date().toISOString() };
          return { data: mockDepartments[index], success: true } as T;
        }
        return { data: null, success: false, message: 'Department not found' } as T;
      }
    }
    
    // Default response
    return { data: null, success: false, message: 'Endpoint not found' } as T;
  }

  // Student API methods
  async getStudents(_params?: PaginationParams): Promise<PaginatedResponse<Student>> {
    return this.request<PaginatedResponse<Student>>('/students', {
      method: 'GET',
    });
  }

  async getStudent(id: string): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/students/${id}`);
  }

  async createStudent(data: CreateStudentRequest): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStudent(id: string, data: UpdateStudentRequest): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStudent(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  async getStudentCourses(studentId: string): Promise<ApiResponse<CourseWithSchedule[]>> {
    return this.request<ApiResponse<CourseWithSchedule[]>>(`/students/${studentId}/courses`);
  }

  // Doctor API methods
  async getDoctors(_params?: PaginationParams): Promise<PaginatedResponse<Doctor>> {
    return this.request<PaginatedResponse<Doctor>>('/doctors');
  }

  async getDoctor(id: string): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>(`/doctors/${id}`);
  }

  async createDoctor(data: CreateDoctorRequest): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>('/doctors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDoctor(id: string, data: UpdateDoctorRequest): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDoctor(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/doctors/${id}`, {
      method: 'DELETE',
    });
  }

  // Course API methods
  async getCourses(_params?: PaginationParams): Promise<PaginatedResponse<CourseWithSchedule>> {
    return this.request<PaginatedResponse<CourseWithSchedule>>('/courses');
  }

  async getCourse(id: string): Promise<ApiResponse<CourseWithSchedule>> {
    return this.request<ApiResponse<CourseWithSchedule>>(`/courses/${id}`);
  }

  async createCourse(data: CreateCourseRequest): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCourse(id: string, data: UpdateCourseRequest): Promise<ApiResponse<Course>> {
    return this.request<ApiResponse<Course>>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCourse(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Department API methods
  async getDepartments(_params?: PaginationParams): Promise<PaginatedResponse<Department>> {
    return this.request<PaginatedResponse<Department>>('/departments');
  }

  async getDepartment(id: string): Promise<ApiResponse<Department>> {
    return this.request<ApiResponse<Department>>(`/departments/${id}`);
  }

  async createDepartment(data: CreateDepartmentRequest): Promise<ApiResponse<Department>> {
    return this.request<ApiResponse<Department>>('/departments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDepartment(id: string, data: UpdateDepartmentRequest): Promise<ApiResponse<Department>> {
    return this.request<ApiResponse<Department>>(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDepartment(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/departments/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
