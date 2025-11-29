'use client';

// Edit student page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { studentService } from '@/services/studentService';
import type { Student, StudentUpdate } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<StudentUpdate>({
    fname: '',
    lname: '',
    email: '',
    username: '',
    gender: '',
    level: 1,
    cgpa: 0,
    deptId: 1,
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await studentService.getById(id);
        setStudent(data);
        setFormData({
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          username: data.username,
          gender: data.gender,
          level: data.level,
          cgpa: data.cgpa,
          deptId: data.deptId,
        });
      } catch (err) {
        setError('Failed to load student');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fnameError = validators.required(formData.fname);
    if (fnameError) newErrors.fname = fnameError;
    const lnameError = validators.required(formData.lname);
    if (lnameError) newErrors.lname = lnameError;
    const emailError = validators.required(formData.email) || validators.email(formData.email);
    if (emailError) newErrors.email = emailError;
    const usernameError = validators.required(formData.username);
    if (usernameError) newErrors.username = usernameError;
    const genderError = validators.required(formData.gender);
    if (genderError) newErrors.gender = genderError;
    const levelError = validators.range(formData.level, 1, 4);
    if (levelError) newErrors.level = levelError;
    const cgpaError = validators.range(formData.cgpa, 0, 4);
    if (cgpaError) newErrors.cgpa = cgpaError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      await studentService.update(id, formData);
      router.push(`/students/${id}`);
    } catch (err) {
      alert('Failed to update student');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'level' || name === 'deptId'
          ? parseInt(value) || 0
          : name === 'cgpa'
          ? parseFloat(value) || 0
          : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const genderOptions = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!student) return <Error message="Student not found" />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/students/${id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Student
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Edit Student</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              error={errors.fname}
              required
            />
            <FormField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              error={errors.lname}
              required
            />
          </div>

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Gender"
              name="gender"
              type="select"
              value={formData.gender}
              onChange={handleChange}
              error={errors.gender}
              required
              options={genderOptions}
            />
            <FormField
              label="Level"
              name="level"
              type="number"
              value={formData.level}
              onChange={handleChange}
              error={errors.level}
              required
              min={1}
              max={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="CGPA"
              name="cgpa"
              type="number"
              value={formData.cgpa}
              onChange={handleChange}
              error={errors.cgpa}
              required
              min={0}
              max={4}
              step="0.01"
            />
            <FormField
              label="Department ID"
              name="deptId"
              type="number"
              value={formData.deptId}
              onChange={handleChange}
              required
              min={1}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/students/${id}`}
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
