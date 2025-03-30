import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface LayoutProps {
  sidebar?: ReactNode;
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ sidebar, children, showSidebar = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">Study Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Add any header actions here if needed */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={twMerge(
            'w-[320px] bg-white border-r border-slate-200 transition-all duration-300 ease-in-out transform shadow-md',
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-6 h-full overflow-y-auto">{sidebar}</div>
        </div>

        {/* Main Content */}
        <main className={twMerge(
          'flex-1 transition-all duration-300 ease-in-out overflow-y-auto',
          showSidebar ? 'ml-[320px]' : 'ml-0'
        )}>
          <div className="p-8 h-full">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            Made with ❤️ in Stuttgart by Sebastian Boehler
          </p>
        </div>
      </footer>
    </div>
  );
}
