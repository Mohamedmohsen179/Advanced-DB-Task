'use client';

// Edit department page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { departmentService } from '@/services/departmentService';
import type { Departement, DepartementUpdate } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function EditDepartmentPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [department, setDepartment] = useState<Departement | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<DepartementUpdate>({
    deptName: '',
    docId: null,
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await departmentService.getById(id);
        setDepartment(data);
        setFormData({
          deptName: data.deptName,
          docId: data.docId,
        });
      } catch (err) {
        setError('Failed to load department');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDepartment();
    }
  }, [id]);

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
      setSaving(true);
      await departmentService.update(id, formData);
      router.push(`/departments/${id}`);
    } catch (err) {
      alert('Failed to update department');
      console.error(err);
    } finally {
      setSaving(false);
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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!department) return <Error message="Department not found" />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/departments/${id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Department
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Edit Department</h1>

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
              disabled={saving}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/departments/${id}`}
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

