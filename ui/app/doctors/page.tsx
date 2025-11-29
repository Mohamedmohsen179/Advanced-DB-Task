'use client';

// Doctors list page
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { doctorService } from '@/services/doctorService';
import type { Doctor } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';
import Table from '@/components/Table';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, totalCount] = await Promise.all([
        doctorService.getAll(),
        doctorService.getCount(),
      ]);
      setDoctors(data);
      setCount(totalCount);
    } catch (err) {
      setError('Failed to load doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await doctorService.delete(id);
      fetchDoctors();
    } catch (err) {
      alert('Failed to delete doctor');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchDoctors} />;

  const columns = [
    { header: 'ID', accessor: 'docId' as keyof Doctor },
    {
      header: 'Name',
      accessor: (row: Doctor) => `${row.fname} ${row.lname}`,
    },
    { header: 'Email', accessor: 'email' as keyof Doctor },
    {
      header: 'Salary',
      accessor: (row: Doctor) => (row.salary ? `$${row.salary.toLocaleString()}` : 'N/A'),
    },
    {
      header: 'Actions',
      accessor: (row: Doctor) => (
        <div className="flex space-x-2">
          <Link
            href={`/doctors/${row.docId}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
          >
            View
          </Link>
          <Link
            href={`/doctors/${row.docId}/edit`}
            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
          >
            Edit
          </Link>
          <DeleteButton
            onDelete={() => handleDelete(row.docId)}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doctors</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Total: {count} doctors</p>
        </div>
        <Link
          href="/doctors/create"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Add New Doctor
        </Link>
      </div>

      <Table
        data={doctors}
        columns={columns}
        keyExtractor={(row) => row.docId}
        emptyMessage="No doctors found. Create your first doctor to get started."
      />
    </div>
  );
}
