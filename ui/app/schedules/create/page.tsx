'use client';

// Create schedule page
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { scheduleService } from '@/services/scheduleService';
import type { CourseScheduleCreate } from '@/types';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function CreateSchedulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CourseScheduleCreate>({
    crsId: 1,
    day: '',
    startHour: '',
    endHour: '',
    level: null,
    location: null,
  });

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
      setLoading(true);
      await scheduleService.create(formData);
      router.push('/schedules');
    } catch (err) {
      alert('Failed to create schedule');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'crsId' || name === 'level' ? (value ? parseInt(value) || null : null) : value || null,
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/schedules" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Schedules
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create New Schedule</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Course ID"
            name="crsId"
            type="number"
            value={formData.crsId}
            onChange={handleChange}
            required
            min={1}
          />

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
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Schedule'}
            </button>
            <Link
              href="/schedules"
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

