'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { doctorsApi } from '@/lib/api';
import type { Doctor } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';

export default function DoctorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await doctorsApi.getById(id);
        setDoctor(data);
      } catch (err) {
        setError('Failed to load doctor');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await doctorsApi.delete(id);
      router.push('/doctors');
    } catch (err) {
      alert('Failed to delete doctor');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!doctor) return <Error message="Doctor not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/doctors" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Doctors
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {doctor.fname} {doctor.lname}
          </h1>
          <div className="space-x-2">
            <Link
              href={`/doctors/${id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit
            </Link>
            <DeleteButton onDelete={handleDelete} itemName={`${doctor.fname} ${doctor.lname}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Doctor ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{doctor.docId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">SSN</h2>
            <p className="text-lg text-gray-900 dark:text-white">{doctor.ssn}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h2>
            <p className="text-lg text-gray-900 dark:text-white">{doctor.email}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</h2>
            <p className="text-lg text-gray-900 dark:text-white">{doctor.username}</p>
          </div>
          {doctor.gender && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</h2>
              <p className="text-lg text-gray-900 dark:text-white">{doctor.gender}</p>
            </div>
          )}
          {doctor.dob && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</h2>
              <p className="text-lg text-gray-900 dark:text-white">{doctor.dob}</p>
            </div>
          )}
          {doctor.age && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Age</h2>
              <p className="text-lg text-gray-900 dark:text-white">{doctor.age}</p>
            </div>
          )}
          {doctor.hireDate && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Hire Date</h2>
              <p className="text-lg text-gray-900 dark:text-white">{doctor.hireDate}</p>
            </div>
          )}
          {doctor.hourRate && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Hour Rate</h2>
              <p className="text-lg text-gray-900 dark:text-white">${doctor.hourRate}</p>
            </div>
          )}
          {doctor.hoursPerWeek && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Hours Per Week</h2>
              <p className="text-lg text-gray-900 dark:text-white">{doctor.hoursPerWeek}</p>
            </div>
          )}
          {doctor.salary && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Salary</h2>
              <p className="text-lg text-gray-900 dark:text-white">${doctor.salary.toLocaleString()}</p>
            </div>
          )}
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Department ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{doctor.deptId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

