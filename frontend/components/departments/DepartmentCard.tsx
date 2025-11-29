'use client';

import Link from 'next/link';
import { Department } from '../../types';
import Button from '../ui/Button';

interface DepartmentCardProps {
  department: Department;
  onEdit?: (department: Department) => void;
  onDelete?: (departmentId: number) => void;
}

export default function DepartmentCard({ department, onEdit, onDelete }: DepartmentCardProps) {

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-professional hover:shadow-professional-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{department.Dept_Name}</h3>
            <p className="text-sm font-medium text-slate-500">{department.Dept_Code || `Dept ${department.Dept_ID}`}</p>
          </div>
        </div>

        {department.Dept_Description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{department.Dept_Description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Dept ID</span>
            <p className="text-sm font-semibold text-slate-900">{department.Dept_ID}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Head Doctor</span>
            <p className="text-sm font-semibold text-slate-900">Dr. {department.Doc_ID}</p>
          </div>
          {department.Location && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Location</span>
              <p className="text-sm text-gray-900">{department.Location}</p>
            </div>
          )}
        </div>

        {department.Establish_Date && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500">Established</span>
            <p className="text-sm text-gray-900">
              {new Date(department.Establish_Date).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <Link
            href={`/departments/${department.Dept_ID}`}
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
                onClick={() => onDelete(department.Dept_ID)}
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

