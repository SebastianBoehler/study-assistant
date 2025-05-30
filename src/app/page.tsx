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
      <div className="flex-1 overflow-auto px-4 md:px-8 bg-slate-50 min-h-[60vh] md:min-h-0 flex flex-col items-center justify-center"> {/* Ensure vertical stacking for sections */}
        <div className="max-w-2xl w-full mx-auto py-12 text-center"> {/* Centering content and text, ensure full width for children */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10">
            Unlock Your Learning Potential
          </h1>

          {/* AI Exam Generation Section */}
          <div className="my-8 p-6 bg-white rounded-xl shadow-xl text-left"> {/* Enhanced shadow, rounded corners, text-left for content inside card */}
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">AI Exam Generation</h2>
            <p className="text-slate-600 mb-6">
              Upload your study materials (PDFs, text files) and instantly generate custom practice exams. Test your knowledge, identify areas for improvement, and accelerate your learning.
            </p>
            <Link
              href="/exam"
              className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 h-11 px-8 shadow-md hover:shadow-lg"
            >
              Create an Exam
            </Link>
          </div>

          {/* Personalized Learning Plans Section */}
          <div className="my-8 p-6 bg-white rounded-xl shadow-xl text-left"> {/* Enhanced shadow, rounded corners, text-left for content inside card */}
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">Personalized Learning Plans</h2>
            <p className="text-slate-600 mb-6">
              Coming Soon: Let our AI analyze your learning goals and materials to create a tailored study schedule, resource recommendations, and progress tracking to keep you on the path to success.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 bg-slate-400 text-white h-11 px-8 opacity-50 cursor-not-allowed shadow-md"
              disabled
            >
              Coming Soon
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
