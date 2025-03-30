'use client';

import { useState } from 'react';
import { QuestionDisplay } from '@/components/exam/questionDisplay';
import { FileInfo } from '@/hooks/types';
import { uploadFile } from '@/hooks/utils';
import { Sidebar } from '@/components/ui/sidebar';

export default function Home() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [language, setLanguage] = useState<string>('english');

  const handleFilesSelected = async (newFiles: File[]) => {
    const newFileInfos = newFiles.map(file => ({
      file,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...newFileInfos]);
    setError('');

    // Upload each file
    const uploadPromises = newFiles.map(async (file, index) => {
      const result = await uploadFile(file);
      
      setFiles(prev => {
        const newFiles = [...prev];
        const currentIndex = prev.length - newFiles.length + index;
        newFiles[currentIndex] = result;
        return newFiles;
      });

      return result;
    });

    await Promise.all(uploadPromises);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleGenerateExam = async (lang: string) => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    const uploadedFiles = files.filter(f => f.status === 'uploaded');
    if (uploadedFiles.length === 0) {
      setError('Please wait for files to finish uploading');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generateExam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: uploadedFiles.map(f => ({
            name: f.file.name,
            gsUri: f.gsUri,
            mimeType: f.file.type
          })),
          language: lang
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate exam');
      }

      const data = await response.json();
      setExamData(data.exam);
    } catch (err) {
      setError('Failed to generate exam. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderContent = () => {
    if (!examData) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-lg">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Welcome to Study Assistant
            </h1>
            <p className="text-slate-600">
              Upload your study materials in the sidebar to generate a personalized exam. 
              We support PDF, DOCX, TXT, and other common file formats.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center w-full h-full overflow-auto">
        <div className="w-full max-w-4xl py-8">
          <QuestionDisplay exam={examData} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Sidebar - full width on mobile, fixed width on desktop */}
      <div className="w-full md:w-[320px] bg-white border-b md:border-r md:border-b-0 border-slate-200 shadow-md overflow-auto">
        <div className="p-6 h-full">
          <Sidebar
            files={files}
            isGenerating={isGenerating}
            error={error}
            onFilesSelected={handleFilesSelected}
            onRemoveFile={handleRemoveFile}
            onGenerateExam={handleGenerateExam}
          />
        </div>
      </div>

      {/* Main Content - increased height on mobile */}
      <div className="flex-1 overflow-auto px-4 md:px-8 bg-white min-h-[60vh] md:min-h-0">
        {renderContent()}
      </div>
    </div>
  );
}
