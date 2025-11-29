'use client';

// Schedule detail page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { scheduleService } from '@/services/scheduleService';
import type { CourseSchedule } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';

export default function ScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [schedule, setSchedule] = useState<CourseSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await scheduleService.getById(id);
        setSchedule(data);
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

  const handleDelete = async () => {
    try {
      await scheduleService.delete(id);
      router.push('/schedules');
    } catch (err) {
      alert('Failed to delete schedule');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!schedule) return <Error message="Schedule not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/schedules" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Schedules
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Schedule</h1>
          <div className="space-x-2">
            <Link
              href={`/schedules/${id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit
            </Link>
            <DeleteButton onDelete={handleDelete} itemName={`Schedule ${id}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Schedule ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{schedule.schId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Course ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{schedule.crsId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Day</h2>
            <p className="text-lg text-gray-900 dark:text-white">{schedule.day}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Time</h2>
            <p className="text-lg text-gray-900 dark:text-white">
              {schedule.startHour} - {schedule.endHour}
            </p>
          </div>
          {schedule.level && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Level</h2>
              <p className="text-lg text-gray-900 dark:text-white">{schedule.level}</p>
            </div>
          )}
          {schedule.location && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h2>
              <p className="text-lg text-gray-900 dark:text-white">{schedule.location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

