'use client';

// Courses list page
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { courseService } from '@/services/courseService';
import type { Course } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';
import Table from '@/components/Table';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, totalCount] = await Promise.all([
        courseService.getAll(),
        courseService.getCount(),
      ]);
      setCourses(data);
      setCount(totalCount);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await courseService.delete(id);
      fetchCourses();
    } catch (err) {
      alert('Failed to delete course');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchCourses} />;

  const columns = [
    { header: 'ID', accessor: 'crsId' as keyof Course },
    { header: 'Name', accessor: 'crsName' as keyof Course },
    { header: 'Credit Hours', accessor: 'creditHours' as keyof Course },
    {
      header: 'Actions',
      accessor: (row: Course) => (
        <div className="flex space-x-2">
          <Link
            href={`/courses/${row.crsId}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
          >
            View
          </Link>
          <Link
            href={`/courses/${row.crsId}/edit`}
            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
          >
            Edit
          </Link>
          <DeleteButton
            onDelete={() => handleDelete(row.crsId)}
            itemName={row.crsName}
            className="!inline-block"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Courses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Total: {count} courses</p>
        </div>
        <Link
          href="/courses/create"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Add New Course
        </Link>
      </div>

      <Table
        data={courses}
        columns={columns}
        keyExtractor={(row) => row.crsId}
        emptyMessage="No courses found. Create your first course to get started."
      />
    </div>
  );
}
