'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/fileUpload';
import { FileList } from '@/components/exam/fileList';
import { FileInfo } from '@/hooks/types';

interface SidebarProps {
  files: FileInfo[];
  isGenerating: boolean;
  error: string;
  onFilesSelected: (files: File[]) => Promise<void>;
  onRemoveFile: (index: number) => void;
  onGenerateExam: () => Promise<void>;
}

export function Sidebar({
  files,
  isGenerating,
  error,
  onFilesSelected,
  onRemoveFile,
  onGenerateExam
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="pb-6 border-b border-slate-200">
        <p className="text-sm text-slate-600">
          Upload your study materials and generate personalized exam questions to test your knowledge.
        </p>
      </div>
      
      <div className="flex-1 overflow-auto py-6">
        <FileUpload onFilesSelected={onFilesSelected} />
        
        <div className="mt-6">
          <FileList files={files} onRemove={onRemoveFile} />
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-200">
        <Button
          onClick={onGenerateExam}
          isLoading={isGenerating}
          disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
          className="w-full py-2"
        >
          {isGenerating ? 'Generating...' : 'Generate Exam'}
        </Button>
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
