'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreateCourseRequest } from '../../../types';
import { apiService } from '../../../services/api';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<{ Dept_ID: number; Dept_Name: string; Dept_Code: string }[]>([]);
  const [doctors, setDoctors] = useState<{ Doc_ID: number; FName: string; LName: string }[]>([]);

  const [formData, setFormData] = useState<CreateCourseRequest>({
    Crs_Name: '',
    Discription: '',
    Credit_Hours: 3,
    Doc_ID: 0,
    Dept_ID: 0,
    Max_Num_Stu: 30,
  });

  useEffect(() => {
    loadDepartments();
    loadDoctors();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await apiService.getDepartments();
      if (response.success && response.data.length > 0) {
        setDepartments(response.data.map(d => ({ Dept_ID: d.Dept_ID, Dept_Name: d.Dept_Name, Dept_Code: d.Dept_Code || '' })));
        if (!formData.Dept_ID) {
          setFormData(prev => ({ ...prev, Dept_ID: response.data[0].Dept_ID }));
        }
      }
    } catch (err) {
      console.error('Error loading departments:', err);
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await apiService.getDoctors();
      if (response.success && response.data.length > 0) {
        setDoctors(response.data.map(d => ({ Doc_ID: d.Doc_ID, FName: d.FName, LName: d.LName })));
        if (!formData.Doc_ID) {
          setFormData(prev => ({ ...prev, Doc_ID: response.data[0].Doc_ID }));
        }
      }
    } catch (err) {
      console.error('Error loading doctors:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Credit_Hours' || name === 'Max_Num_Stu' || name === 'Doc_ID' || name === 'Dept_ID'
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.createCourse(formData);

      if (response.success) {
        router.push('/courses');
      } else {
        setError(response.message || 'Failed to create course');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while creating the course';
      setError(errorMessage);
      console.error('Error creating course:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Add New Course</h1>
        <p className="mt-2 text-base text-slate-600">
          Enter New Course information below
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
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700 whitespace-pre-line">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-900">Course Information</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="Crs_Name" className="block text-sm font-semibold text-slate-700">
                  Course Name *
                </label>
                <input
                  type="text"
                  id="Crs_Name"
                  name="Crs_Name"
                  required
                  value={formData.Crs_Name}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Credit_Hours" className="block text-sm font-semibold text-slate-700">
                  Credit Hours *
                </label>
                <input
                  type="number"
                  id="Credit_Hours"
                  name="Credit_Hours"
                  required
                  min="1"
                  max="6"
                  value={formData.Credit_Hours}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="Discription" className="block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  id="Discription"
                  name="Discription"
                  rows={3}
                  value={formData.Discription}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="Dept_ID" className="block text-sm font-semibold text-slate-700">
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
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.Dept_ID} value={dept.Dept_ID}>
                      {dept.Dept_Name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="Doc_ID" className="block text-sm font-semibold text-slate-700">
                  Instructor (Doctor) *
                </label>
                <select
                  id="Doc_ID"
                  name="Doc_ID"
                  required
                  value={formData.Doc_ID}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="">Select Instructor</option>
                  {doctors.map(doc => (
                    <option key={doc.Doc_ID} value={doc.Doc_ID}>
                      Dr. {doc.FName} {doc.LName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="Max_Num_Stu" className="block text-sm font-semibold text-slate-700">
                  Max Students
                </label>
                <input
                  type="number"
                  id="Max_Num_Stu"
                  name="Max_Num_Stu"
                  min="1"
                  value={formData.Max_Num_Stu}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
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
                Create Course
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

