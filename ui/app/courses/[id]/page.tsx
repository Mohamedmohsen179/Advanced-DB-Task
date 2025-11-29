'use client';

// Course detail page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { courseService } from '@/services/courseService';
import type { Course, Enrollement, CourseSchedule } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';
import Table from '@/components/Table';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [course, setCourse] = useState<Course | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<Enrollement[]>([]);
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [crs, students, scheds] = await Promise.all([
          courseService.getById(id),
          courseService.getStudentsByCourse(id),
          courseService.getSchedulesByCourse(id),
        ]);
        setCourse(crs);
        setEnrolledStudents(students);
        setSchedules(scheds);
      } catch (err) {
        setError('Failed to load course');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await courseService.delete(id);
      router.push('/courses');
    } catch (err) {
      alert('Failed to delete course');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!course) return <Error message="Course not found" />;

  const studentColumns = [
    { header: 'Student ID', accessor: 'stuId' as keyof Enrollement },
    { header: 'Grade', accessor: (row: Enrollement) => row.grade || 'N/A' },
    { header: 'Year', accessor: 'year' as keyof Enrollement },
  ];

  const scheduleColumns = [
    { header: 'Schedule ID', accessor: 'schId' as keyof CourseSchedule },
    { header: 'Day', accessor: 'day' as keyof CourseSchedule },
    {
      header: 'Time',
      accessor: (row: CourseSchedule) => `${row.startHour} - ${row.endHour}`,
    },
    { header: 'Level', accessor: (row: CourseSchedule) => row.level || 'N/A' },
    { header: 'Location', accessor: (row: CourseSchedule) => row.location || 'N/A' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href="/courses" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Courses
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.crsName}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Course ID: {course.crsId}</p>
          </div>
          <div className="space-x-2">
            <Link
              href={`/courses/${id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit
            </Link>
            <DeleteButton onDelete={handleDelete} itemName={course.crsName} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h2>
            <p className="text-lg text-gray-900 dark:text-white">{course.discription}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Credit Hours</h2>
            <p className="text-lg text-gray-900 dark:text-white">{course.creditHours}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Doctor ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{course.docId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Department ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{course.deptId}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Enrolled Students ({enrolledStudents.length})
        </h2>
        <Table
          data={enrolledStudents}
          columns={studentColumns}
          keyExtractor={(row) => `${row.stuId}-${row.crsId}`}
          emptyMessage="No students enrolled in this course."
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Course Schedules ({schedules.length})
        </h2>
        <Table
          data={schedules}
          columns={scheduleColumns}
          keyExtractor={(row) => row.schId}
          emptyMessage="No schedules for this course."
        />
      </div>
    </div>
  );
}
