'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/fileUpload';
import { FileList } from '@/components/exam/fileList';
import { Layout } from '@/components/ui/layout';
import { QuestionDisplay } from '@/components/exam/questionDisplay';
import { FileInfo } from '@/hooks/types';
import { uploadFile } from '@/hooks/utils';

export default function Home() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [error, setError] = useState<string>('');

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

  const handleGenerateExam = async () => {
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
          }))
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

  const renderSidebar = () => (
    <div className="flex flex-col h-full space-y-6">
      <div className="pb-6 border-b border-slate-200">
        <p className="text-sm text-slate-600">
          Upload your study materials and generate personalized exam questions to test your knowledge.
        </p>
      </div>
      
      <div className="flex-grow">
        <FileUpload onFilesSelected={handleFilesSelected} />
        
        <div className="mt-6">
          <FileList files={files} onRemove={handleRemoveFile} />
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-200">
        <Button
          onClick={handleGenerateExam}
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

  const renderContent = () => {
    if (!examData) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Welcome to Study Assistant
            </h1>
            <p className="text-slate-600 max-w-lg mx-auto">
              Upload your study materials in the sidebar to generate a personalized exam. 
              We support PDF, DOCX, TXT, and other common file formats.
            </p>
          </div>
        </div>
      );
    }

    return <QuestionDisplay exam={examData} />;
  };

  return (
    <Layout
      sidebar={renderSidebar()}
      showSidebar={true}
    >
      {renderContent()}
    </Layout>
  );
}
