'use client';

// Students list page
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { studentService } from '@/services/studentService';
import type { Student } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';
import Table from '@/components/Table';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, totalCount] = await Promise.all([
        studentService.getAll(),
        studentService.getCount(),
      ]);
      setStudents(data);
      setCount(totalCount);
    } catch (err) {
      setError('Failed to load students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await studentService.delete(id);
      fetchStudents();
    } catch (err) {
      alert('Failed to delete student');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchStudents} />;

  const columns = [
    { header: 'ID', accessor: 'stuId' as keyof Student },
    {
      header: 'Name',
      accessor: (row: Student) => `${row.fname} ${row.lname}`,
    },
    { header: 'Email', accessor: 'email' as keyof Student },
    { header: 'Level', accessor: 'level' as keyof Student },
    { header: 'CGPA', accessor: (row: Student) => row.cgpa.toFixed(2) },
    {
      header: 'Actions',
      accessor: (row: Student) => (
        <div className="flex space-x-2">
          <Link
            href={`/students/${row.stuId}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
          >
            View
          </Link>
          <Link
            href={`/students/${row.stuId}/edit`}
            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
          >
            Edit
          </Link>
          <DeleteButton
            onDelete={() => handleDelete(row.stuId)}
            itemName={`${row.fname} ${row.lname}`}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Total: {count} students</p>
        </div>
        <Link
          href="/students/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Student
        </Link>
      </div>

      <Table
        data={students}
        columns={columns}
        keyExtractor={(row) => row.stuId}
        emptyMessage="No students found. Create your first student to get started."
      />
    </div>
  );
}
