// Stat Card component for dashboard
import React from 'react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  href?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function StatCard({ title, value, icon, href, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-100',
    green: 'bg-green-500 text-green-100',
    purple: 'bg-purple-500 text-purple-100',
    orange: 'bg-orange-500 text-orange-100',
    red: 'bg-red-500 text-red-100',
  };

  const content = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

