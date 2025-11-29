'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Department, PaginatedResponse } from '../types';
import { apiService } from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import DepartmentCard from '../components/departments/DepartmentCard';

export default function DepartmentsContainer() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Department> = await apiService.getDepartments();

      if (response.success) {
        setDepartments(response.data);
      } else {
        setError('Failed to load departments');
      }
    } catch (err) {
      setError('An error occurred while loading departments');
      console.error('Error loading departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (department: Department) => {
    // TODO: Implement edit functionality
    console.log('Edit department:', department);
  };

  const handleDelete = async (departmentId: number) => {
    if (!confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
      return;
    }

    try {
      await apiService.deleteDepartment(String(departmentId));
      // Reload departments after deletion
      await loadDepartments();
    } catch (err) {
      setError('Failed to delete department');
      console.error('Error deleting department:', err);
    }
  };

  const filteredDepartments = departments;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
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
                onClick={loadDepartments}
                className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Departments</h1>
          <p className="mt-2 text-base text-slate-600">
            Manage academic departments and their information
          </p>
        </div>
        <Link href="/departments/new">
          <Button>Add Department</Button>
        </Link>
      </div>

      {/* Stats */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-600">
              Showing {filteredDepartments.length} departments
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading departments...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && filteredDepartments.length === 0 && (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏢</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {departments.length === 0 ? 'No departments found' : 'No departments match your filters'}
              </h3>
              <p className="text-gray-500 mb-6">
                {departments.length === 0
                  ? 'Get started by adding your first department.'
                  : 'Try adjusting your filters to see more departments.'
                }
              </p>
              {departments.length === 0 && (
                <Link href="/departments/new">
                  <Button>Add Department</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Departments Grid */}
      {!loading && filteredDepartments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <DepartmentCard
              key={department.Dept_ID}
              department={department}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

