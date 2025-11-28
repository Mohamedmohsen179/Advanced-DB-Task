'use client';

import { useState, useEffect } from 'react';
import { Doctor, PaginatedResponse } from '../types';
import { apiService } from '../services/api';
import DoctorTable from '../components/doctors/DoctorTable';

export default function DoctorsContainer() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Doctor> = await apiService.getDoctors();
      
      if (response.success) {
        setDoctors(response.data);
      } else {
        setError('Failed to load doctors');
      }
    } catch (err) {
      setError('An error occurred while loading doctors');
      console.error('Error loading doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    // TODO: Implement edit functionality
    console.log('Edit doctor:', doctor);
  };

  const handleDelete = async (doctorId: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) {
      return;
    }

    try {
      await apiService.deleteDoctor(doctorId);
      // Reload doctors after deletion
      await loadDoctors();
    } catch (err) {
      setError('Failed to delete doctor');
      console.error('Error deleting doctor:', err);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={loadDoctors}
                className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Doctors</h1>
          <p className="mt-2 text-base text-slate-600">
            Manage faculty and staff information
          </p>
        </div>
      </div>

      <DoctorTable
        doctors={doctors}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
