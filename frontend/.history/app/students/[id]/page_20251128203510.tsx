'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Student, CourseWithSchedule, ApiResponse } from '../../../types';
import { apiService } from '../../../services/api';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function StudentDetailsPage() {
  const params = useParams();
  const studentId = params.id as string;
  
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<CourseWithSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (studentId) {
      loadStudentData();
      loadStudentCourses();
    }
  }, [studentId]); 

  const loadStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Student> = await apiService.getStudent(studentId);
      
      if (response.success && response.data) {
        setStudent(response.data);
      } else {
        setError('Student not found');
      }
    } catch (err) {
      setError('Failed to load student data');
      console.error('Error loading student:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentCourses = async () => {
    try {
      setCoursesLoading(true);
      const response: ApiResponse<CourseWithSchedule[]> = await apiService.getStudentCourses(studentId);
      
      if (response.success && response.data) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error('Error loading student courses:', err);
    } finally {
      setCoursesLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading student details...</span>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
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
            <div className="mt-4">
              <Link href="/students">
                <Button variant="outline">Back to Students</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Student ID: {student.studentId}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/students">
            <Button variant="outline">Back to Students</Button>
          </Link>
          <Button>Edit Student</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Full Name</label>
                  <p className="mt-1 text-sm text-gray-900">{student.firstName} {student.lastName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{student.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="mt-1 text-sm text-gray-900">{student.phoneNumber || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Enrollment Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : student.status === 'inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : student.status === 'graduated'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </div>
                
                {student.gpa && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">GPA</label>
                    <p className="mt-1 text-sm text-gray-900">{student.gpa.toFixed(2)}</p>
                  </div>
                )}
              </div>
              
              {student.address && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Address</h3>
                  <div className="text-sm text-gray-900">
                    {student.address.street && <p>{student.address.street}</p>}
                    {(student.address.city || student.address.state || student.address.zipCode) && (
                      <p>
                        {student.address.city}
                        {student.address.city && student.address.state && ', '}
                        {student.address.state} {student.address.zipCode}
                      </p>
                    )}
                    {student.address.country && <p>{student.address.country}</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Enrolled Courses</span>
                  <span className="text-lg font-semibold text-gray-900">{courses.length}</span>
                </div>
                
                {student.gpa && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Current GPA</span>
                    <span className="text-lg font-semibold text-gray-900">{student.gpa.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Years Enrolled</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {Math.floor((new Date().getTime() - new Date(student.enrollmentDate).getTime()) / (1000 * 60 * 60 * 24 * 365))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Enrolled Courses</h2>
            <Button size="sm">Enroll in Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          {coursesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
              <p className="text-gray-500 mb-4">This student is not currently enrolled in any courses.</p>
              <Button size="sm">Enroll in Course</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.code}</p>
                      <p className="text-sm text-gray-600 mt-1">{course.credits} Credits</p>
                      {course.instructor && (
                        <p className="text-sm text-gray-600">
                          Instructor: {course.instructor.firstName} {course.instructor.lastName}
                        </p>
                      )}
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      course.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  
                  {course.schedules && course.schedules.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-1">Schedule:</p>
                      {course.schedules.map((schedule) => (
                        <p key={schedule.id} className="text-xs text-gray-600">
                          {schedule.dayOfWeek.charAt(0).toUpperCase() + schedule.dayOfWeek.slice(1)} {schedule.startTime} - {schedule.endTime}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
