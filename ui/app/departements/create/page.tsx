'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { departementsApi } from '@/lib/api';
import type { DepartementCreate } from '@/types';

export default function CreateDepartementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<DepartementCreate>({
    deptName: '',
    docId: null,
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.deptName.trim()) newErrors.deptName = 'Department name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await departementsApi.create(formData);
      router.push('/departements');
    } catch (err) {
      alert('Failed to create departement');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'docId' ? (value ? parseInt(value) || null : null) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/departements" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Departements
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create New Departement</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department Name *
            </label>
            <input
              type="text"
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.deptName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.deptName && <p className="text-red-500 text-sm mt-1">{errors.deptName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Head Doctor ID (Optional)
            </label>
            <input
              type="number"
              name="docId"
              min="1"
              value={formData.docId || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Departement'}
            </button>
            <Link
              href="/departements"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

