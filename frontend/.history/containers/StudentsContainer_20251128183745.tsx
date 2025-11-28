'use client';

import { useState, useEffect } from 'react';
import { Student, PaginatedResponse } from '../types';
import { apiService } from '../services/api';
import StudentTable from '../components/students/StudentTable';

export default function StudentsContainer() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Student> = await apiService.getStudents();

      if (response.success) {
        setStudents(response.data);
      } else {
        setError('Failed to load students');
      }
    } catch (err) {
      setError('An error occurred while loading students');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student: Student) => {
    // TODO: Implement edit functionality
    console.log('Edit student:', student);
  };

  const handleDelete = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      await apiService.deleteStudent(studentId);
      // Reload students after deletion
      await loadStudents();
    } catch (err) {
      setError('Failed to delete student');
      console.error('Error deleting student:', err);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={loadStudents}
                className="bg-red-100 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-800 hover:bg-red-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">tudents</h1>
          <p className="mt-2 text-base text-slate-600">
            Manage Faculty Student Information and Details
          </p>
        </div>
      </div>

      <StudentTable
        students={students}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
