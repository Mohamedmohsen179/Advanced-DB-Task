'use client';

// Schedules list page
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { scheduleService } from '@/services/scheduleService';
import type { CourseSchedule } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';
import Table from '@/components/Table';

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, totalCount] = await Promise.all([
        scheduleService.getAll(),
        scheduleService.getCount(),
      ]);
      setSchedules(data);
      setCount(totalCount);
    } catch (err) {
      setError('Failed to load schedules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await scheduleService.delete(id);
      fetchSchedules();
    } catch (err) {
      alert('Failed to delete schedule');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={fetchSchedules} />;

  const columns = [
    { header: 'ID', accessor: 'schId' as keyof CourseSchedule },
    { header: 'Course ID', accessor: 'crsId' as keyof CourseSchedule },
    { header: 'Day', accessor: 'day' as keyof CourseSchedule },
    {
      header: 'Time',
      accessor: (row: CourseSchedule) => `${row.startHour} - ${row.endHour}`,
    },
    { header: 'Level', accessor: (row: CourseSchedule) => row.level || 'N/A' },
    {
      header: 'Actions',
      accessor: (row: CourseSchedule) => (
        <div className="flex space-x-2">
          <Link
            href={`/schedules/${row.schId}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
          >
            View
          </Link>
          <Link
            href={`/schedules/${row.schId}/edit`}
            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
          >
            Edit
          </Link>
          <DeleteButton
            onDelete={() => handleDelete(row.schId)}
            itemName={`Schedule ${row.schId}`}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Schedules</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Total: {count} schedules</p>
        </div>
        <Link
          href="/schedules/create"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Create New Schedule
        </Link>
      </div>

      <Table
        data={schedules}
        columns={columns}
        keyExtractor={(row) => row.schId}
        emptyMessage="No schedules found. Create your first schedule to get started."
      />
    </div>
  );
}

