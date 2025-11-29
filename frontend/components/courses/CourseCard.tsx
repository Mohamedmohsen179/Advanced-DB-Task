'use client';

import Link from 'next/link';
import { CourseWithSchedule } from '../../types';
import Button from '../ui/Button';

interface CourseCardProps {
  course: CourseWithSchedule;
  onEdit?: (course: CourseWithSchedule) => void;
  onDelete?: (courseId: number) => void;
}

export default function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const getLevelColor = (level?: number) => {
    switch (level) {
      case 4:
        return 'bg-purple-100 text-purple-800';
      case 3:
        return 'bg-blue-100 text-blue-800';
      case 2:
        return 'bg-green-100 text-green-800';
      case 1:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-professional hover:shadow-professional-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">

        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{course.Crs_Name}</h3>
            <p className="text-sm font-medium text-slate-500">Course ID: {course.Crs_ID}</p>
          </div>
          <div className="flex space-x-2">
            {course.schedules && course.schedules.length > 0 && course.schedules[0].Level && (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.schedules[0].Level)}`}>
                Level {course.schedules[0].Level}
              </span>
            )}
          </div>
        </div>

        {course.Discription && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{course.Discription}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Credit Hours</span>
            <p className="text-sm font-semibold text-slate-900">{course.Credit_Hours}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Max Students</span>
            <p className="text-sm font-semibold text-slate-900">
              {course.Max_Num_Stu || 'Not set'}
            </p>
          </div>
          {course.instructor && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Instructor (Doctor)</span>
              <p className="text-sm text-gray-900">
                Dr. {course.instructor.FName} {course.instructor.LName}
              </p>
            </div>
          )}
          {course.department && (
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Department</span>
              <p className="text-sm text-gray-900">{course.department.Dept_Name}</p>
            </div>
          )}
        </div>

        {course.schedules && course.schedules.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500">Schedule</span>
            <div className="mt-1 space-y-1">
              {course.schedules.map((schedule) => (
                <div key={schedule.Sch_ID} className="text-sm text-gray-900">
                  <span>{schedule.Day}</span> {schedule.Start_Hour} - {schedule.END_Hour}
                  {schedule.Location && (
                    <span className="text-gray-500 ml-2">• {schedule.Location}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <Link
            href={`/courses/${course.Crs_ID}`}
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
                onClick={() => onDelete(course.Crs_ID)}
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
