'use client';

// Dashboard page with statistics
import { useEffect, useState } from 'react';
import { studentService } from '@/services/studentService';
import { doctorService } from '@/services/doctorService';
import { departmentService } from '@/services/departmentService';
import { courseService } from '@/services/courseService';
import { scheduleService } from '@/services/scheduleService';
import StatCard from '@/components/StatCard';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    doctors: 0,
    departments: 0,
    courses: 0,
    schedules: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const [students, doctors, departments, courses, schedules] = await Promise.all([
          studentService.getCount(),
          doctorService.getCount(),
          departmentService.getCount(),
          courseService.getCount(),
          scheduleService.getCount(),
        ]);

        setStats({ students, doctors, departments, courses, schedules });
      } catch (err) {
        setError('Failed to load statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.students}
          href="/students"
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Doctors"
          value={stats.doctors}
          href="/doctors"
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-2.111 0-4.15-.603-5.963-1.745M21 13.255v-2.127A23.931 23.931 0 0012 8c-2.111 0-4.15.603-5.963 1.745M21 13.255c0 1.892-1.232 3.544-3.005 4.05M5.037 11.255c-1.773.506-3.005 2.158-3.005 4.05m0 0v2.127A23.931 23.931 0 0012 20c2.111 0 4.15-.603 5.963-1.745M8.037 15.305c1.773.506 3.005 2.158 3.005 4.05V20m-3.005-4.695c-1.773-.506-3.005-2.158-3.005-4.05V9.255c0-1.892 1.232-3.544 3.005-4.05" />
            </svg>
          }
        />
        <StatCard
          title="Departments"
          value={stats.departments}
          href="/departments"
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        <StatCard
          title="Courses"
          value={stats.courses}
          href="/courses"
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <StatCard
          title="Schedules"
          value={stats.schedules}
          href="/schedules"
          color="red"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <a
            href="/students/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center transition-colors"
          >
            Add Student
          </a>
          <a
            href="/doctors/create"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center transition-colors"
          >
            Add Doctor
          </a>
          <a
            href="/departments/create"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center transition-colors"
          >
            Add Department
          </a>
          <a
            href="/courses/create"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-center transition-colors"
          >
            Add Course
          </a>
          <a
            href="/schedules/create"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center transition-colors"
          >
            Add Schedule
          </a>
        </div>
      </div>
    </div>
  );
}

