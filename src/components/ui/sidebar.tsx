'use client';

import { useState } from 'react';
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
  onGenerateExam: (lang: string, level: string, onlyMultipleChoice: boolean) => Promise<void>;
}

export function Sidebar({
  files,
  isGenerating,
  error,
  onFilesSelected,
  onRemoveFile,
  onGenerateExam
}: SidebarProps) {
  const [language, setLanguage] = useState<string>('english');
  const [level, setLevel] = useState<string>('medium');
  const [onlyMultipleChoice, setOnlyMultipleChoice] = useState<boolean>(false);
  
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };
  
  return (
    <div className="flex flex-col md:h-full">
      <div className="pb-6 border-b border-slate-200">
        <p className="text-sm text-slate-600">
          Upload your study materials and generate personalized exam questions to test your knowledge.
        </p>
      </div>
      
      <div className="flex-1 md:overflow-auto py-6">
        <FileUpload onFilesSelected={onFilesSelected} />
        
        <div className="mt-6">
          <FileList files={files} onRemove={onRemoveFile} />
        </div>
        
        <div className="mt-6">
          <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 mb-2">
            Exam Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isGenerating}
          >
            <option value="english">English</option>
            <option value="german">German</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="italian">Italian</option>
            <option value="portuguese">Portuguese</option>
            <option value="dutch">Dutch</option>
          </select>
        </div>
        <div className="mt-6">
          <label htmlFor="level-select" className="block text-sm font-medium text-slate-700 mb-2">
            Exam Level
          </label>
          <select
            id="level-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isGenerating}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mt-6">
          <input 
            type="checkbox"
            id="only-multiple-choice"
            checked={onlyMultipleChoice}
            onChange={(e) => setOnlyMultipleChoice(e.target.checked)}
            disabled={isGenerating}
          />
          <label htmlFor="only-multiple-choice" className="ml-2 text-md">
            Only multiple choice
          </label>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-200">
        <Button
          onClick={() => onGenerateExam(language, level, onlyMultipleChoice)}
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
