import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Study Assistant',
  description: 'Generate exams from your study materials',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center h-16">
                <h1 className="text-xl font-bold text-blue-600">Study Assistant</h1>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden bg-white">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 py-4 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-slate-500">
                Made with ❤️ in Stuttgart by Sebastian Boehler
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
