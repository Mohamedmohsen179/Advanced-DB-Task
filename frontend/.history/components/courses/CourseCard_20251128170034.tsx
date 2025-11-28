'use client';

import Link from 'next/link';
import { CourseWithSchedule } from '../../types';
import Button from '../ui/Button';

interface CourseCardProps {
  course: CourseWithSchedule;
  onEdit?: (course: CourseWithSchedule) => void;
  onDelete?: (courseId: string) => void;
}

export default function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSemesterColor = (semester: string) => {
    switch (semester) {
      case 'fall':
        return 'bg-orange-100 text-orange-800';
      case 'spring':
        return 'bg-green-100 text-green-800';
      case 'summer':
        return 'bg-yellow-100 text-yellow-800';
      case 'winter':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-professional hover:shadow-professional-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{course.name}</h3>
            <p className="text-sm font-medium text-slate-500">{course.code}</p>
          </div>
          <div className="flex space-x-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
              {course.status}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSemesterColor(course.semester)}`}>
              {course.semester} {course.year}
            </span>
          </div>
        </div>

        {/* Description */}
        {course.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
        )}

        {/* Course Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Credits</span>
            <p className="text-sm font-semibold text-slate-900">{course.credits}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Enrollment</span>
            <p className="text-sm font-semibold text-slate-900">
              {course.enrolledStudents}/{course.maxStudents}
            </p>
          </div>
          {course.instructor && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Instructor</span>
              <p className="text-sm text-gray-900">
                {course.instructor.firstName} {course.instructor.lastName}
              </p>
            </div>
          )}
          {course.department && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Department</span>
              <p className="text-sm text-gray-900">{course.department.name}</p>
            </div>
          )}
        </div>

        {/* Schedule */}
        {course.schedules && course.schedules.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500">Schedule</span>
            <div className="mt-1 space-y-1">
              {course.schedules.map((schedule) => (
                <div key={schedule.id} className="text-sm text-gray-900">
                  <span className="capitalize">{schedule.dayOfWeek}</span> {schedule.startTime} - {schedule.endTime}
                  {schedule.location && (
                    <span className="text-gray-500 ml-2">• {schedule.location}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500">Prerequisites</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {course.prerequisites.map((prereq, index) => (
                <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Enrollment Progress</span>
            <span>{Math.round((course.enrolledStudents / course.maxStudents) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${course.enrolledStudents / course.maxStudents >= 0.9
                  ? 'bg-red-500'
                  : course.enrolledStudents / course.maxStudents >= 0.7
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <Link
            href={`/courses/${course.id}`}
            className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors duration-200"
          >
            View Details
          </Link>
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(course)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(course.id)}
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
