'use client'; // For consistency, though this page is mostly static

import Link from 'next/link';
// Button component might not be used if Link is styled directly
// import { Button } from '@/components/ui/button'; 

export default function LandingPage() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] bg-white border-b md:border-r md:border-b-0 border-slate-200 shadow-md overflow-auto">
        <div className="p-6 h-full">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Navigation</h2>
          <nav className="space-y-2">
            <Link href="/exam" legacyBehavior>
              <a className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">
                Create Exam
              </a>
            </Link>
            <Link href="/settings" legacyBehavior>
              <a className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">
                Settings
              </a>
            </Link>
            {/* Add more navigation links here if needed */}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 bg-slate-50 min-h-[60vh] md:min-h-0 flex items-center justify-center"> {/* Added bg-slate-50 and centering for content */}
        <div className="max-w-2xl mx-auto py-12 text-center"> {/* Centering content and text */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Welcome to Study Assistant
          </h1>
          <p className="text-lg text-slate-700 mb-4">
            Your personal AI-powered tool to generate practice exams from your study materials. Upload PDFs, text files, and more, then let Study Assistant help you prepare!
          </p>
          <p className="text-lg text-slate-700 mb-8">
            Customize your exams by difficulty level. Language preferences can be configured in the settings.
          </p>
          <Link
            href="/exam"
            className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 h-12 px-8 text-lg mt-4 shadow-md hover:shadow-lg" // Enhanced styling
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
