'use client';

// Edit schedule page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { scheduleService } from '@/services/scheduleService';
import type { CourseSchedule, CourseScheduleUpdate } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function EditSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [schedule, setSchedule] = useState<CourseSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CourseScheduleUpdate>({
    day: '',
    startHour: '',
    endHour: '',
    level: null,
    location: null,
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await scheduleService.getById(id);
        setSchedule(data);
        setFormData({
          day: data.day,
          startHour: data.startHour,
          endHour: data.endHour,
          level: data.level,
          location: data.location,
        });
      } catch (err) {
        setError('Failed to load schedule');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchedule();
    }
  }, [id]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const dayError = validators.required(formData.day);
    if (dayError) newErrors.day = dayError;
    const startError = validators.required(formData.startHour);
    if (startError) newErrors.startHour = startError;
    const endError = validators.required(formData.endHour);
    if (endError) newErrors.endHour = endError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      await scheduleService.update(id, formData);
      router.push(`/schedules/${id}`);
    } catch (err) {
      alert('Failed to update schedule');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'level' ? (value ? parseInt(value) || null : null) : value || null,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const days = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!schedule) return <Error message="Schedule not found" />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/schedules/${id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Schedule
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Edit Schedule</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Day"
            name="day"
            type="select"
            value={formData.day}
            onChange={handleChange}
            error={errors.day}
            required
            options={days}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Start Hour"
              name="startHour"
              type="time"
              value={formData.startHour}
              onChange={handleChange}
              error={errors.startHour}
              required
            />
            <FormField
              label="End Hour"
              name="endHour"
              type="time"
              value={formData.endHour}
              onChange={handleChange}
              error={errors.endHour}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Level"
              name="level"
              type="number"
              value={formData.level || ''}
              onChange={handleChange}
              min={1}
              max={4}
            />
            <FormField
              label="Location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/schedules/${id}`}
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

