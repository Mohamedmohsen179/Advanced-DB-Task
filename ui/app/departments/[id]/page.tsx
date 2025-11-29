'use client';

// Department detail page
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { departmentService } from '@/services/departmentService';
import type { Departement, Doctor, Student } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DeleteButton from '@/components/DeleteButton';
import Table from '@/components/Table';

export default function DepartmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const [department, setDepartment] = useState<Departement | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [dept, deptDoctors, deptStudents] = await Promise.all([
          departmentService.getById(id),
          departmentService.getDoctorsByDepartment(id),
          departmentService.getStudentsByDepartment(id),
        ]);
        setDepartment(dept);
        setDoctors(deptDoctors);
        setStudents(deptStudents);
      } catch (err) {
        setError('Failed to load department');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await departmentService.delete(id);
      router.push('/departments');
    } catch (err) {
      alert('Failed to delete department');
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!department) return <Error message="Department not found" />;

  const doctorColumns = [
    { header: 'ID', accessor: 'docId' as keyof Doctor },
    {
      header: 'Name',
      accessor: (row: Doctor) => `${row.fname} ${row.lname}`,
    },
    { header: 'Email', accessor: 'email' as keyof Doctor },
  ];

  const studentColumns = [
    { header: 'ID', accessor: 'stuId' as keyof Student },
    {
      header: 'Name',
      accessor: (row: Student) => `${row.fname} ${row.lname}`,
    },
    { header: 'Email', accessor: 'email' as keyof Student },
    { header: 'Level', accessor: 'level' as keyof Student },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href="/departments" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
          ← Back to Departments
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{department.deptName}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Department ID: {department.deptId}</p>
          </div>
          <div className="space-x-2">
            <Link
              href={`/departments/${id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit
            </Link>
            <DeleteButton onDelete={handleDelete} itemName={department.deptName} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Head Doctor ID</h2>
            <p className="text-lg text-gray-900 dark:text-white">{department.docId || 'Not assigned'}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Doctors in this Department ({doctors.length})
        </h2>
        <Table
          data={doctors}
          columns={doctorColumns}
          keyExtractor={(row) => row.docId}
          emptyMessage="No doctors in this department."
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Students in this Department ({students.length})
        </h2>
        <Table
          data={students}
          columns={studentColumns}
          keyExtractor={(row) => row.stuId}
          emptyMessage="No students in this department."
        />
      </div>
    </div>
  );
}

