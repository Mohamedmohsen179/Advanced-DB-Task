'use client';

import Link from 'next/link';
import { Department } from '../../types';
import Button from '../ui/Button';

interface DepartmentCardProps {
  department: Department;
  onEdit?: (department: Department) => void;
  onDelete?: (departmentId: string) => void;
}

export default function DepartmentCard({ department, onEdit, onDelete }: DepartmentCardProps) {

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-professional hover:shadow-professional-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{department.name}</h3>
            <p className="text-sm font-medium text-slate-500">{department.code}</p>
          </div>
        </div>

        {department.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{department.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Students</span>
            <p className="text-sm font-semibold text-slate-900">{department.studentCount}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Doctors</span>
            <p className="text-sm font-semibold text-slate-900">{department.facultyCount}</p>
          </div>
          {department.budget && (
            <div className="col-span-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Budget</span>
              <p className="text-sm font-semibold text-slate-900">
                ${department.budget.toLocaleString()}
              </p>
            </div>
          )}
          {department.location && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Location</span>
              <p className="text-sm text-gray-900">{department.location}</p>
            </div>
          )}
          {department.email && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Email</span>
              <p className="text-sm text-gray-900">{department.email}</p>
            </div>
          )}
          {department.phoneNumber && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Phone</span>
              <p className="text-sm text-gray-900">{department.phoneNumber}</p>
            </div>
          )}
        </div>

        {department.establishedDate && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500">Established</span>
            <p className="text-sm text-gray-900">
              {new Date(department.establishedDate).getFullYear()}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <Link
            href={`/departments/${department.id}`}
            className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors duration-200"
          >
            View Details
          </Link>
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(department)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(department.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

