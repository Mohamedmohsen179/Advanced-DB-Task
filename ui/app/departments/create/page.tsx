'use client';

// Create department page
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { departmentService } from '@/services/departmentService';
import type { DepartementCreate } from '@/types';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function CreateDepartmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<DepartementCreate>({
    deptName: '',
    docId: null,
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const nameError = validators.required(formData.deptName);
    if (nameError) newErrors.deptName = nameError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await departmentService.create(formData);
      router.push('/departments');
    } catch (err) {
      alert('Failed to create department');
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
        <Link href="/departments" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Departments
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create New Department</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Department Name"
            name="deptName"
            value={formData.deptName}
            onChange={handleChange}
            error={errors.deptName}
            required
          />

          <FormField
            label="Head Doctor ID (Optional)"
            name="docId"
            type="number"
            value={formData.docId || ''}
            onChange={handleChange}
            min={1}
          />

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Department'}
            </button>
            <Link
              href="/departments"
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

