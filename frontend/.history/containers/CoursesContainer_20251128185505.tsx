'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CourseWithSchedule, PaginatedResponse } from '../types';
import { apiService } from '../services/api';
import CourseCard from '../components/courses/CourseCard';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function CoursesContainer() {
  const [courses, setCourses] = useState<CourseWithSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'Level1' | 'Level2' | 'Level3' | 'Level4'>('all');
  const [semesterFilter, setSemesterFilter] = useState<'all' | 'fall' | 'spring' | 'summer' | 'winter'>('all');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<CourseWithSchedule> = await apiService.getCourses();

      if (response.success) {
        setCourses(response.data);
      } else {
        setError('Failed to load Courses');
      }
    } catch (err) {
      setError('An error occurred while loading courses');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: CourseWithSchedule) => {
    // TODO: Implement edit functionality
    console.log('Edit course:', course);
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      await apiService.deleteCourse(courseId);
      // Reload courses after deletion
      await loadCourses();
    } catch (err) {
      setError('Failed to delete course');
      console.error('Error deleting course:', err);
    }
  };

  const filteredCourses = courses.filter(course => {
    const statusMatch = filter === 'all' || course.code === filter;
    const semesterMatch = semesterFilter === 'all' || course.semester === semesterFilter;
    return statusMatch && semesterMatch;
  });

  if (error) {
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
              <button
                onClick={loadCourses}
                className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
              >
                Try Again
              </button>
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Courses</h1>
          <p className="mt-2 text-base text-slate-600">
            Manage Courses Details and Schedules
          </p>
        </div>
        <Link href="/courses/new">
          <Button>Add Course</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-red text-sm font-semibold text-slate-700 mb-1">Level</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'Level1' | 'Level2' | 'Level3' | 'Level4')}
                className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm
                text-black focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="all">All Levels</option>
                <option value="Level1">Level 1</option>
                <option value="Level2">Level 2</option>
                <option value="Level3">Level 3</option>
                <option value="Level4">Level 4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Semester</label>
              <select
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value as 'all' | 'fall' | 'spring' | 'summer' | 'winter')}
                className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="all">All Semesters</option>
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
              </select>
            </div>

            <div className="flex-1"></div>

            <div className="text-sm font-medium text-slate-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && filteredCourses.length === 0 && (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {courses.length === 0 ? 'No courses found' : 'No courses match your filters'}
              </h3>
              <p className="text-gray-500 mb-6">
                {courses.length === 0
                  ? 'Get started by adding your first course.'
                  : 'Try adjusting your filters to see more courses.'
                }
              </p>
              {courses.length === 0 && (
                <Link href="/courses/new">
                  <Button>Add Course</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses Grid */}
      {!loading && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
