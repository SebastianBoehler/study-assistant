'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header'; // Import the new Header

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50"> {/* Ensure page takes full height and has a base bg color */}
      <Header />

      <main className="flex-1"> {/* Main content area will take remaining space */}
        {/* A. Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transform Your Study Habits with StudyAssistant
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto">
              Generate personalized exams, get smart study plans, and master your subjects with cutting-edge AI technology.
            </p>
            <Link
              href="/exam"
              className="inline-block bg-white text-blue-700 font-semibold text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
            >
              Create Your First Exam
            </Link>
            <div className="mt-12">
              {/* Placeholder for hero image/graphic */}
              {/* <img src="/path-to-your-hero-image.svg" alt="Study Assistant Hero Image" className="mx-auto w-full max-w-3xl" /> */}
              <p className="text-sm opacity-75"> {/* Placeholder comment styling */}
                {/* Illustration: Students collaborating with AI assistance */}
              </p>
            </div>
          </div>
        </section>

        {/* B. Features/Benefits Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-16">
              Everything You Need to Succeed
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="bg-slate-50 p-8 rounded-lg shadow-lg text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {/* Icon for Smart Exam Generation */}
                  <svg className="w-12 h-12 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Smart Exam Generation</h3>
                <p className="text-slate-600">
                  Upload your materials and get custom exams in minutes. Pinpoint weak areas and focus on what truly matters.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-slate-50 p-8 rounded-lg shadow-lg text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {/* Icon for Personalized Study Schedules */}
                  <svg className="w-12 h-12 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Personalized Study Schedules</h3>
                <p className="text-slate-600">
                  (Coming Soon) Stay organized with AI-driven study plans tailored to your course load and learning style.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-slate-50 p-8 rounded-lg shadow-lg text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                   {/* Icon for In-depth Performance Analytics */}
                  <svg className="w-12 h-12 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Performance Analytics</h3>
                <p className="text-slate-600">
                  (Coming Soon) Track your progress, understand your strengths, and conquer your exams with detailed insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* C. How It Works Section */}
        <section className="py-16 md:py-24 bg-slate-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-16">
              Get Started in 3 Simple Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {/* Step 1 */}
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-600 text-white rounded-full text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Upload Your Materials</h3>
                <p className="text-slate-600">PDFs, text notes, or even lecture slides – we handle it all.</p>
              </div>
              {/* Step 2 */}
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-600 text-white rounded-full text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Customize Your Exam</h3>
                <p className="text-slate-600">Choose difficulty, question types, and focus areas for a tailored experience.</p>
              </div>
              {/* Step 3 */}
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-600 text-white rounded-full text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Start Learning Smarter</h3>
                <p className="text-slate-600">Take your generated exam and get instant feedback to guide your studies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* D. Testimonials/Social Proof Section - Placeholder */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Loved by Students Like You</h2>
            {/* Placeholder for Testimonials content */}
            <p className="text-slate-600 max-w-xl mx-auto">
              (Testimonials will be displayed here. For now, imagine positive quotes from happy users!)
            </p>
          </div>
        </section>

        {/* E. Final Call to Action Section */}
        <section className="py-20 md:py-32 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your Grades?
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of students who are studying smarter, not harder, with StudyAssistant.
            </p>
            <Link
              href="/exam" // Or a future signup page
              className="inline-block bg-white text-blue-700 font-semibold text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
