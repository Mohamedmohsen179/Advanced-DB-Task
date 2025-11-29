'use client';

// Create doctor page
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doctorService } from '@/services/doctorService';
import type { DoctorCreate } from '@/types';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function CreateDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<DoctorCreate>({
    ssn: '',
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    hireDate: null,
    dob: null,
    gender: null,
    hourRate: null,
    hoursPerWeek: null,
    salary: null,
    deptId: 1,
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const ssnError = validators.required(formData.ssn);
    if (ssnError) newErrors.ssn = ssnError;
    const fnameError = validators.required(formData.fname);
    if (fnameError) newErrors.fname = fnameError;
    const lnameError = validators.required(formData.lname);
    if (lnameError) newErrors.lname = lnameError;
    const emailError = validators.required(formData.email) || validators.email(formData.email);
    if (emailError) newErrors.email = emailError;
    const usernameError = validators.required(formData.username);
    if (usernameError) newErrors.username = usernameError;
    const passwordError = validators.required(formData.password);
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await doctorService.create(formData);
      router.push('/doctors');
    } catch (err) {
      alert('Failed to create doctor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'deptId' || name === 'hourRate' || name === 'hoursPerWeek' || name === 'salary'
          ? value ? parseInt(value) || null : null
          : value || null,
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/doctors" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Doctors
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create New Doctor</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="SSN"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            error={errors.ssn}
            required
          />

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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              required
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Gender"
              name="gender"
              type="select"
              value={formData.gender || ''}
              onChange={handleChange}
              options={genderOptions}
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob || ''}
              onChange={handleChange}
            />
            <FormField
              label="Hire Date"
              name="hireDate"
              type="date"
              value={formData.hireDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Hour Rate"
              name="hourRate"
              type="number"
              value={formData.hourRate || ''}
              onChange={handleChange}
              min={0}
            />
            <FormField
              label="Hours Per Week"
              name="hoursPerWeek"
              type="number"
              value={formData.hoursPerWeek || ''}
              onChange={handleChange}
              min={0}
            />
            <FormField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary || ''}
              onChange={handleChange}
              min={0}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Doctor'}
            </button>
            <Link
              href="/doctors"
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
