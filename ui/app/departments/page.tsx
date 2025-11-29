'use client';

// Departments list page
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { departmentService } from '@/services/departmentService';
import type { Departement } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';
import Table from '@/components/Table';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Departement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, totalCount] = await Promise.all([
        departmentService.getAll(),
        departmentService.getCount(),
      ]);
      setDepartments(data);
      setCount(totalCount);
    } catch (err) {
      setError('Failed to load departments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await departmentService.delete(id);
      fetchDepartments();
    } catch (err) {
      alert('Failed to delete department');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchDepartments} />;

  const columns = [
    { header: 'ID', accessor: 'deptId' as keyof Departement },
    { header: 'Name', accessor: 'deptName' as keyof Departement },
    {
      header: 'Head Doctor ID',
      accessor: (row: Departement) => row.docId || 'N/A',
    },
    {
      header: 'Actions',
      accessor: (row: Departement) => (
        <div className="flex space-x-2">
          <Link
            href={`/departments/${row.deptId}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
          >
            View
          </Link>
          <Link
            href={`/departments/${row.deptId}/edit`}
            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
          >
            Edit
          </Link>
          <DeleteButton
            onDelete={() => handleDelete(row.deptId)}
            itemName={row.deptName}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Departments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Total: {count} departments</p>
        </div>
        <Link
          href="/departments/create"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add New Department
        </Link>
      </div>

      <Table
        data={departments}
        columns={columns}
        keyExtractor={(row) => row.deptId}
        emptyMessage="No departments found. Create your first department to get started."
      />
    </div>
  );
}

