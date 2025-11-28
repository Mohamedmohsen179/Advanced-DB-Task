'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-professional border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="h-10 w-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-3 text-xl font-bold text-slate-900 tracking-tight">
                Faculty Management System
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/students"
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Students
            </Link>

            <Link
              href="/doctors"
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Doctors
            </Link>
            <Link
              href="/courses"
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Courses
            </Link>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-4 space-y-2 border-t border-slate-200 bg-slate-50/50">
              <Link
                href="/students"
                className="text-slate-700 hover:text-slate-900 hover:bg-white block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Students
              </Link>
              <Link
                href="/doctors"
                className="text-slate-700 hover:text-slate-900 hover:bg-white block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Doctors
              </Link>
              <Link
                href="/courses"
                className="text-slate-700 hover:text-slate-900 hover:bg-white block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <button className="w-full text-left bg-slate-900 text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-slate-800 transition-all duration-200 mt-4">
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
