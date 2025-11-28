# University Management System - Frontend

A comprehensive University Management System built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** following **Clean Architecture** principles.

## 🏗️ Architecture Overview

This frontend application follows a **Component-Based Architecture** with clear separation of concerns:

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── students/          # Student management pages
│   ├── doctors/           # Doctor management pages
│   ├── courses/           # Course management pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (Navbar, Sidebar)
│   ├── students/         # Student-specific components
│   ├── doctors/          # Doctor-specific components
│   ├── courses/          # Course-specific components
│   └── ui/               # Generic UI components
├── containers/           # Logic & state management containers
├── services/            # API service layer
├── types/              # TypeScript interfaces
├── hooks/              # Custom React hooks
└── utils/              # Utility functions
```

### Architecture Principles

1. **Pages**: Route-level components using Next.js App Router
2. **Containers**: Handle state management, API calls, and business logic
3. **Components**: Pure presentation components (dumb components)
4. **Services**: API interaction layer with mock data support
5. **Types**: Centralized TypeScript interfaces and types

## 🚀 Features

### Core Functionality
- **Dashboard**: Overview with statistics and quick actions
- **Student Management**: CRUD operations, enrollment tracking, GPA management
- **Doctor Management**: Faculty profiles, qualifications, research interests
- **Course Management**: Course offerings, schedules, enrollment limits
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Clean Architecture**: Separation of concerns and maintainable code structure
- **Mock API**: Ready for backend integration with comprehensive mock data
- **Modern UI**: Beautiful, accessible interface with Tailwind CSS
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Smooth user experience with loading indicators

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks (useState, useEffect)
- **API Layer**: Custom service layer with mock data
- **Icons**: Unicode emojis for simplicity
- **Deployment Ready**: Optimized for production deployment

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Setup (Optional)
Create a `.env.local` file for environment variables:
```bash
# API Configuration (for future backend integration)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# App Configuration
NEXT_PUBLIC_APP_NAME="University Management System"
```

### 3. Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages & Routes

### Main Routes
- `/` - Dashboard with overview and statistics
- `/students` - Student list and management
- `/students/new` - Add new student form
- `/students/[id]` - Student details with enrolled courses
- `/doctors` - Faculty list and management
- `/doctors/new` - Add new faculty member form
- `/courses` - Course list with filtering
- `/courses/new` - Create new course form (to be implemented)

### Navigation
- **Navbar**: Top navigation with mobile responsiveness
- **Sidebar**: Left navigation with hierarchical menu structure
- **Breadcrumbs**: Contextual navigation (to be implemented)

## 🎨 UI Components

### Layout Components
- `MainLayout` - Main application layout wrapper
- `Navbar` - Top navigation bar
- `Sidebar` - Left sidebar navigation

### UI Components
- `Button` - Customizable button with variants and loading states
- `Card` - Container component with header, content, and footer
- `StudentTable` - Data table for student listings
- `DoctorTable` - Data table for faculty listings
- `CourseCard` - Card component for course display

### Container Components
- `StudentsContainer` - Student management logic and state
- `DoctorsContainer` - Faculty management logic and state
- `CoursesContainer` - Course management logic and state

## 🔌 API Integration

### Current State: Mock Data
The application currently uses mock data through the `apiService` class in `services/api.ts`. This provides:
- Realistic sample data for all entities
- Simulated API delays for realistic UX
- Full CRUD operation simulation
- Error handling patterns

### Backend Integration Ready
The service layer is structured for easy backend integration:

```typescript
// Current mock implementation
const response = await apiService.getStudents();

// Future real API (same interface)
const response = await fetch('/api/students');
```

### API Endpoints (Future Backend)
```
GET    /api/students              # List students
POST   /api/students              # Create student
GET    /api/students/:id          # Get student details
PUT    /api/students/:id          # Update student
DELETE /api/students/:id          # Delete student
GET    /api/students/:id/courses  # Get student's courses

GET    /api/doctors               # List doctors
POST   /api/doctors               # Create doctor
GET    /api/doctors/:id           # Get doctor details
PUT    /api/doctors/:id           # Update doctor
DELETE /api/doctors/:id           # Delete doctor

GET    /api/courses               # List courses
POST   /api/courses               # Create course
GET    /api/courses/:id           # Get course details
PUT    /api/courses/:id           # Update course
DELETE /api/courses/:id           # Delete course

GET    /api/departments           # List departments
```

## 📊 Data Models

### Student
```typescript
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth: string;
  enrollmentDate: string;
  studentId: string;
  departmentId: string;
  address?: Address;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  gpa?: number;
  createdAt: string;
  updatedAt: string;
}
```

### Doctor
```typescript
interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  departmentId: string;
  title: string;
  specialization?: string;
  officeLocation?: string;
  qualifications: string[];
  researchInterests?: string[];
  status: 'active' | 'inactive' | 'on_leave' | 'retired';
  // ... additional fields
}
```

### Course
```typescript
interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  departmentId: string;
  instructorId: string;
  semester: 'fall' | 'spring' | 'summer' | 'winter';
  year: number;
  maxStudents: number;
  enrolledStudents: number;
  status: 'active' | 'inactive' | 'cancelled';
  // ... additional fields
}
```

## 🎯 Future Enhancements

### Immediate Next Steps
1. **Course Creation Form** - Complete the course creation functionality
2. **Edit Forms** - Implement edit functionality for all entities
3. **Advanced Filtering** - Add search and advanced filtering options
4. **Pagination** - Implement proper pagination for large datasets
5. **Bulk Operations** - Add bulk actions for efficiency

### Advanced Features
1. **Authentication & Authorization** - User roles and permissions
2. **Real-time Updates** - WebSocket integration for live updates
3. **File Upload** - Profile pictures and document management
4. **Reports & Analytics** - Comprehensive reporting dashboard
5. **Notifications** - In-app and email notifications
6. **Calendar Integration** - Schedule management and conflicts
7. **Grade Management** - Comprehensive grading system

### Technical Improvements
1. **State Management** - Implement Zustand or Redux for complex state
2. **Caching** - Add React Query for server state management
3. **Testing** - Unit and integration tests with Jest and Testing Library
4. **Performance** - Code splitting and optimization
5. **Accessibility** - WCAG compliance improvements
6. **Internationalization** - Multi-language support

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export
```bash
npm run build
npm run export
```

## 🤝 Contributing

1. Follow the established architecture patterns
2. Maintain TypeScript strict mode compliance
3. Use the existing component patterns and styling
4. Add proper error handling and loading states
5. Update documentation for new features

## 📄 License

This project is part of a university management system implementation.

---

**Ready for Backend Integration**: This frontend is fully prepared to integrate with the NestJS backend API following the same Clean Architecture principles.