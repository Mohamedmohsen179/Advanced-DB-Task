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
  const [departments, setDepartments] = useState<{ id: string; name: string; code: string }[]>([]);
  const [doctors, setDoctors] = useState<{ id: string; firstName: string; lastName: string }[]>([]);

  const [formData, setFormData] = useState<CreateCourseRequest>({
    name: '',
    code: '',
    description: '',
    credits: 3,
    departmentId: '',
    instructorId: '',
    semester: 'fall',
    year: new Date().getFullYear(),
    maxStudents: 30,
    prerequisites: [],
    syllabus: '',
    startDate: '',
    endDate: '',
  });

  const [prerequisiteInput, setPrerequisiteInput] = useState('');

  useEffect(() => {
    loadDepartments();
    loadDoctors();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await apiService.getDepartments();
      if (response.success && response.data.length > 0) {
        setDepartments(response.data.map(d => ({ id: d.id, name: d.name, code: d.code })));
        if (!formData.departmentId) {
          setFormData(prev => ({ ...prev, departmentId: response.data[0].id }));
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
        setDoctors(response.data.map(d => ({ id: d.id, firstName: d.firstName, lastName: d.lastName })));
        if (!formData.instructorId) {
          setFormData(prev => ({ ...prev, instructorId: response.data[0].id }));
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
      [name]: name === 'credits' || name === 'year' || name === 'maxStudents'
        ? parseInt(value) || 0
        : value,
    }));
  };

  const addPrerequisite = () => {
    if (prerequisiteInput.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...(prev.prerequisites || []), prerequisiteInput.trim()],
      }));
      setPrerequisiteInput('');
    }
  };

  const removePrerequisite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites?.filter((_, i) => i !== index) || [],
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
        setError('Failed to create course');
      }
    } catch (err) {
      setError('An error occurred while creating the course');
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
          <h2 className="text-lg font-semibold text-slate-900">Course Information</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                  Course Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-semibold text-slate-700">
                  Course Departement *
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  required
                  value={formData.code}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="credits" className="block text-sm font-semibold text-slate-700">
                  Credit Hours *
                </label>
                <input
                  type="number"
                  id="credits"
                  name="credits"
                  required
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="maxStudents" className="block text-sm font-semibold text-slate-700">
                  Max Students *
                </label>
                <input
                  type="number"
                  id="maxStudents"
                  name="maxStudents"
                  required
                  min="1"
                  value={formData.maxStudents}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="instructorId" className="block text-sm font-semibold text-slate-700">
                  Instructor (Doctor) *
                </label>
                <select
                  id="instructorId"
                  name="instructorId"
                  required
                  value={formData.instructorId}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="">Select Instructor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="semester" className="block text-sm font-semibold text-slate-700">
                  Semester *
                </label>
                <select
                  id="semester"
                  name="semester"
                  required
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="text-black mt-1 block w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
                >
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                </select>
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-semibold text-slate-700">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  required
                  min="2020"
                  max="2030"
                  value={formData.year}
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

