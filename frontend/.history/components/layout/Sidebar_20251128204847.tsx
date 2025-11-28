'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '../../types';

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: '📊',
  },
  {
    label: 'Students',
    href: '/students',
    icon: '👨‍🎓',
    children: [
      { label: 'All Students', href: '/students' },
      { label: 'Add Student', href: '/students/new' },
    ],
  },
  {
    label: 'Doctors',
    href: '/doctors',
    icon: '👨‍🏫',
    children: [
      { label: 'All Doctors', href: '/doctors' },
      { label: 'Add Doctor', href: '/doctors/new' },
    ],
  },
  {
    label: 'Courses',
    href: '/courses',
    icon: '📚',
  },
  {
    label: 'Departments',
    href: '/departments',
    icon: '🏢',
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-professional-lg border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 bg-slate-50/50">
            <Link href="/" className="flex items-center group">
              <div className="h-9 w-9 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-3 text-lg font-bold text-slate-900 tracking-tight">
                FACULTY
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-500 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group
                    ${isActiveLink(item.href)
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <span className="mr-3 text-lg opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                  {item.label}
                </Link>

                {item.children && isActiveLink(item.href) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`
                          block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${pathname === child.href
                            ? 'bg-slate-100 text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }
                        `}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">A</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">admin@fci.edu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
