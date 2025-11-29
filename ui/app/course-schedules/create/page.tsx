'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { courseSchedulesApi } from '@/lib/api';
import type { CourseScheduleCreate } from '@/types';

export default function CreateCourseSchedulePage() {
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
    if (!formData.day.trim()) newErrors.day = 'Day is required';
    if (!formData.startHour.trim()) newErrors.startHour = 'Start hour is required';
    if (!formData.endHour.trim()) newErrors.endHour = 'End hour is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await courseSchedulesApi.create(formData);
      router.push('/course-schedules');
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

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/course-schedules" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Course Schedules
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create New Schedule</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course ID *
            </label>
            <input
              type="number"
              name="crsId"
              min="1"
              value={formData.crsId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Day *
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.day ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {errors.day && <p className="text-red-500 text-sm mt-1">{errors.day}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Hour *
              </label>
              <input
                type="time"
                name="startHour"
                value={formData.startHour}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.startHour ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startHour && <p className="text-red-500 text-sm mt-1">{errors.startHour}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Hour *
              </label>
              <input
                type="time"
                name="endHour"
                value={formData.endHour}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.endHour ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endHour && <p className="text-red-500 text-sm mt-1">{errors.endHour}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Level
              </label>
              <input
                type="number"
                name="level"
                min="1"
                max="4"
                value={formData.level || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Schedule'}
            </button>
            <Link
              href="/course-schedules"
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

