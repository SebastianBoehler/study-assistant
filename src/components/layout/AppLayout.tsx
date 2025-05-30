'use client';

import React from 'react';

interface AppLayoutProps {
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ sidebarContent, mainContent }) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] bg-white border-b md:border-r md:border-b-0 border-slate-200 shadow-md overflow-auto">
        <div className="p-6 h-full">
          {sidebarContent}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 bg-white min-h-[60vh] md:min-h-0">
        {mainContent}
      </div>
    </div>
  );
};

export default AppLayout;
