'use client';

// Edit course page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { courseService } from '@/services/courseService';
import type { Course, CourseUpdate } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CourseUpdate>({
    crsName: '',
    discription: '',
    creditHours: 3,
    docId: 1,
    deptId: 1,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await courseService.getById(id);
        setCourse(data);
        setFormData({
          crsName: data.crsName,
          discription: data.discription,
          creditHours: data.creditHours,
          docId: data.docId,
          deptId: data.deptId,
        });
      } catch (err) {
        setError('Failed to load course');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const nameError = validators.required(formData.crsName);
    if (nameError) newErrors.crsName = nameError;
    const descError = validators.required(formData.discription);
    if (descError) newErrors.discription = descError;
    const hoursError = validators.min(formData.creditHours, 1);
    if (hoursError) newErrors.creditHours = hoursError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      await courseService.update(id, formData);
      router.push(`/courses/${id}`);
    } catch (err) {
      alert('Failed to update course');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'creditHours' || name === 'docId' || name === 'deptId' ? parseInt(value) || 0 : value,
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
  if (!course) return <Error message="Course not found" />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/courses/${id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Course
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Edit Course</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Course Name"
            name="crsName"
            value={formData.crsName}
            onChange={handleChange}
            error={errors.crsName}
            required
          />

          <FormField
            label="Description"
            name="discription"
            type="textarea"
            value={formData.discription}
            onChange={handleChange}
            error={errors.discription}
            required
            rows={4}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Credit Hours"
              name="creditHours"
              type="number"
              value={formData.creditHours}
              onChange={handleChange}
              error={errors.creditHours}
              required
              min={1}
            />
            <FormField
              label="Doctor ID"
              name="docId"
              type="number"
              value={formData.docId}
              onChange={handleChange}
              required
              min={1}
            />
            <FormField
              label="Department ID"
              name="deptId"
              type="number"
              value={formData.deptId}
              onChange={handleChange}
              required
              min={1}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/courses/${id}`}
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
