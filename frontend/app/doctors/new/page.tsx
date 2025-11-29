'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateDoctorRequest } from '../../../types';
import { apiService } from '../../../services/api';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function NewDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateDoctorRequest>({
    Doc_ID: 0,
    SSN: '',
    FName: '',
    LName: '',
    Email: '',
    Username: '',
    Password: '',
    Hire_Date: new Date().toISOString().split('T')[0],
    DOB: '',
    Gender: 'M',
    Hour_Rate: 100,
    Hours_Per_Week: 30,
    Dept_ID: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Doc_ID' || name === 'Hour_Rate' || name === 'Hours_Per_Week' || name === 'Dept_ID'
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.createDoctor(formData);

      if (response.success) {
        router.push('/doctors');
      } else {
        setError('Failed to create doctor');
      }
    } catch (err) {
      setError('An error occurred while creating the doctor');
      console.error('Error creating doctor:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter Doctor&apos;s information below
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
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
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Doctor Information</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="Doc_ID" className="block text-sm font-semibold text-slate-700">
                  Doctor ID *
                </label>
                <input
                  type="number"
                  id="Doc_ID"
                  name="Doc_ID"
                  required
                  value={formData.Doc_ID}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="SSN" className="block text-sm font-medium text-gray-700">
                  SSN (14 digits) *
                </label>
                <input
                  type="text"
                  id="SSN"
                  name="SSN"
                  required
                  maxLength={14}
                  value={formData.SSN}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="FName" className="block text-sm font-semibold text-slate-700">
                  First Name *
                </label>
                <input
                  type="text"
                  id="FName"
                  name="FName"
                  required
                  value={formData.FName}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="LName" className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="LName"
                  name="LName"
                  required
                  value={formData.LName}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  value={formData.Email}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
                  Username *
                </label>
                <input
                  type="text"
                  id="Username"
                  name="Username"
                  required
                  value={formData.Username}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  required
                  value={formData.Password}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="DOB" className="block text-sm font-medium text-gray-700">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="DOB"
                  name="DOB"
                  required
                  value={formData.DOB}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Hire_Date" className="block text-sm font-medium text-gray-700">
                  Hire Date *
                </label>
                <input
                  type="date"
                  id="Hire_Date"
                  name="Hire_Date"
                  required
                  value={formData.Hire_Date}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
                  Gender *
                </label>
                <select
                  id="Gender"
                  name="Gender"
                  required
                  value={formData.Gender}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="Hour_Rate" className="block text-sm font-medium text-gray-700">
                  Hourly Rate *
                </label>
                <input
                  type="number"
                  id="Hour_Rate"
                  name="Hour_Rate"
                  required
                  min="0"
                  value={formData.Hour_Rate}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Hours_Per_Week" className="block text-sm font-medium text-gray-700">
                  Hours Per Week *
                </label>
                <input
                  type="number"
                  id="Hours_Per_Week"
                  name="Hours_Per_Week"
                  required
                  min="1"
                  max="168"
                  value={formData.Hours_Per_Week}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Dept_ID" className="block text-sm font-medium text-gray-700">
                  Department *
                </label>
                <select
                  id="Dept_ID"
                  name="Dept_ID"
                  required
                  value={formData.Dept_ID}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="1">Computer Science</option>
                  <option value="2">Information Technology</option>
                  <option value="3">Information System</option>
                </select>
              </div>
            </div>


            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Create Doctor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
