'use client';

import Link from 'next/link';
import { Doctor } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';

interface DoctorTableProps {
  doctors: Doctor[];
  loading?: boolean;
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (doctorId: number) => void;
}

export default function DoctorTable({
  doctors,
  loading = false,
  onEdit,
  onDelete
}: DoctorTableProps) {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading Doctors' Info...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (doctors.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👨‍🏫</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Doctors Found</h3>
            <p className="text-gray-500 mb-6">Get started by Adding your First Doctor.</p>
            <Link href="/doctors/new">
              <Button>Add Doctor</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Doctors</h2>
          <Link href="/doctors/new">
            <Button>Add Doctor</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Doctor
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Employee ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Departement
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Username
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Hire Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Phone
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-slate-200">
              {doctors.map((doctor) => (
                <tr key={doctor.Doc_ID} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-11 w-11">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                          <span className="text-white font-semibold text-sm">
                            {doctor.FName.charAt(0)}{doctor.LName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-slate-900">
                          {doctor.FName} {doctor.LName}
                        </div>
                        <div className="text-sm text-slate-500">
                          {doctor.Email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.Doc_ID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {doctor.Dept_ID === 1 ? 'Computer Science' : doctor.Dept_ID === 2 ? 'Information Technology' : 'Information System'}
                    </div>
                    <div className="text-sm text-gray-500">{doctor.Gender === 'M' ? 'Male' : 'Female'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctor.Username}</div>
                    <div className="text-sm text-gray-500">SSN: {doctor.SSN}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(doctor.Hire_Date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {doctor.phones && doctor.phones.length > 0 ? doctor.phones[0].Phone_NUM : 'No phone'}
                    </div>
                    {doctor.phones && doctor.phones.length > 1 && (
                      <div className="text-xs text-gray-500">+{doctor.phones.length - 1} more</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link
                      href={`/doctors/${doctor.Doc_ID}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>

                    {onEdit && (
                      <button
                        onClick={() => onEdit(doctor)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(doctor.Doc_ID)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
