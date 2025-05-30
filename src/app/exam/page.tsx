'use client';

import { useState, useContext } from 'react';
import { QuestionDisplay } from '@/components/exam/questionDisplay';
import { Sidebar } from './sidebar'
import { uploadFile, generateExam } from '@/hooks/google';
import { FileState, File as GeminiFile } from '@google/genai';
import { ApiKeyContext } from '@/context/ApiKeyContext';

export default function Home() {
  const [files, setFiles] = useState<Partial<GeminiFile>[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const { apiKey, language } = useContext(ApiKeyContext);

  const handleFilesSelected = async (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles.map(file => ({
      displayName: file.name,
      sizeBytes: file.size.toString(),
      state: FileState.STATE_UNSPECIFIED,
    }))]);
    setError('');

    // Upload each file
    const uploadPromises = newFiles.map(async (file) => {
      const result = await uploadFile(file, apiKey);
      setFiles(prev => prev.map(f => 
        f.displayName === file.name
          ? { ...result }
          : f
      ));
      return result;
    });

    await Promise.all(uploadPromises);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleGenerateExam = async (level: string, onlyMultipleChoice: boolean) => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    const uploadedFiles = files.filter(f => f.state === FileState.ACTIVE);
    if (uploadedFiles.length === 0) {
      setError('Please wait for files to finish uploading');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const result = await generateExam(apiKey, uploadedFiles, level, onlyMultipleChoice, language);
      console.log(result);
      setExamData(result);
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
              Create Your Custom Exam
            </h1>
            <p className="text-slate-600 mb-3">
              Upload your study materials via the sidebar, choose your settings, and generate a custom exam.
            </p>
            <p className="text-slate-600 p-2 bg-blue-50 rounded-md border border-blue-100">
              <strong>New:</strong> Math notation is now supported! Perfect for math, physics, engineering, and science exams.
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
            hasApiKey={!!apiKey}
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
