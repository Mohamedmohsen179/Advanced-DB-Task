'use client';

// Student detail page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { studentsApi } from '@/lib/api';
import type { Student } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await studentsApi.getById(id);
        setStudent(data);
      } catch (err) {
        setError('Failed to load student');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await studentsApi.delete(id);
      router.push('/students');
    } catch (err) {
      alert('Failed to delete student');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!student) return <Error message="Student not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/students"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
        >
          ← Back to Students
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {student.fname} {student.lname}
          </h1>
          <div className="space-x-2">
            <Link
              href={`/students/${id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit
            </Link>
            <DeleteButton onDelete={handleDelete} itemName={`${student.fname} ${student.lname}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Student ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.stuId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">SSN</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.stuSsn}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.email}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.username}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.gender}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Level</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.level}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.dob}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Age</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.age}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">CGPA</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.cgpa.toFixed(2)}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Department ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{student.deptId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

