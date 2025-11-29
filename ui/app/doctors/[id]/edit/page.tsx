'use client';

// Edit doctor page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { doctorService } from '@/services/doctorService';
import type { Doctor, DoctorUpdate } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import FormField from '@/components/FormField';
import { validators } from '@/utils/validation';

export default function EditDoctorPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<DoctorUpdate>({
    fname: '',
    lname: '',
    email: '',
    username: '',
    hireDate: null,
    dob: null,
    gender: null,
    hourRate: null,
    hoursPerWeek: null,
    salary: null,
    deptId: 1,
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await doctorService.getById(id);
        setDoctor(data);
        setFormData({
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          username: data.username,
          hireDate: data.hireDate,
          dob: data.dob,
          gender: data.gender,
          hourRate: data.hourRate,
          hoursPerWeek: data.hoursPerWeek,
          salary: data.salary,
          deptId: data.deptId,
        });
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      await doctorService.update(id, formData);
      router.push(`/doctors/${id}`);
    } catch (err) {
      alert('Failed to update doctor');
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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!doctor) return <Error message="Doctor not found" />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/doctors/${id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Doctor
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Edit Doctor</h1>

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
              disabled={saving}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/doctors/${id}`}
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
