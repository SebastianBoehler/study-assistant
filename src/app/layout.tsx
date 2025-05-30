import './globals.css'
import 'katex/dist/katex.min.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApiKeyProvider } from '@/context/ApiKeyContext';
import Header from '@/components/layout/Header';
import { Analytics } from "@vercel/analytics/next"

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
        <ApiKeyProvider>
          <div className="flex flex-col h-full">
            {/* Header */}
            <Header />
            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden bg-white">
              {children}
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-4 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-slate-500">
                  Made with ❤️ in Stuttgart by&nbsp;
                  <span className="hover:underline" title="Visit Sebastian Boehler's LinkedIn profile">
                    <a href="https://www.linkedin.com/in/sebastian-boehler/" target="_blank" rel="noopener noreferrer">
                      Sebastian Boehler
                    </a>
                  </span>
                </p>
              </div>
            </footer>
          </div>
        </ApiKeyProvider>
        <Analytics />
      </body>
    </html>
  )
}
