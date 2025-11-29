'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { departementsApi } from '@/lib/api';
import type { Departement } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';

export default function DepartementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [departement, setDepartement] = useState<Departement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartement = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await departementsApi.getById(id);
        setDepartement(data);
      } catch (err) {
        setError('Failed to load departement');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDepartement();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await departementsApi.delete(id);
      router.push('/departements');
    } catch (err) {
      alert('Failed to delete departement');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!departement) return <Error message="Departement not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/departements" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Departements
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{departement.deptName}</h1>
          <div className="space-x-2">
            <Link
              href={`/departements/${id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit
            </Link>
            <DeleteButton onDelete={handleDelete} itemName={departement.deptName} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Department ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{departement.deptId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Head Doctor ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{departement.docId || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

