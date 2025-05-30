'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b border-slate-200">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo/Site Title */}
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-slate-800 hover:text-blue-700 transition-colors">
            StudyAssistant
          </a>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 md:space-x-6">
          <Link href="/exam" legacyBehavior>
            <a className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Exam
            </a>
          </Link>
          <Link href="/settings" legacyBehavior>
            <a className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
              Settings
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
