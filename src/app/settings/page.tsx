'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ApiKeyContext } from '@/context/ApiKeyContext';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { apiKey, setApiKey, language, setLanguage } = useContext(ApiKeyContext);
  const [key, setKey] = useState<string>(apiKey);

  useEffect(() => {
    setKey(apiKey);
  }, [apiKey]);

  const handleSaveApiKey = () => {
    setApiKey(key);
    // Consider a more robust notification system in a real app
    alert('API key saved!');
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // In a real app, you might want to save this preference (e.g., localStorage or backend)
    console.log('Language changed to:', newLanguage);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] bg-white border-b md:border-r md:border-b-0 border-slate-200 shadow-md overflow-auto">
        <div className="p-6 h-full">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Navigation</h2>
          <nav className="space-y-2">
            <Link href="/" legacyBehavior>
              <a className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">
                Home
              </a>
            </Link>
            <Link href="/exam" legacyBehavior>
              <a className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">
                Exam
              </a>
            </Link>
            {/* Add more navigation links here if needed */}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 bg-white min-h-[60vh] md:min-h-0 py-6">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">Settings</h1>

        {/* API Key Settings */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-slate-700">API Key Configuration</h2>
          <div className="mb-4">
            <label htmlFor="api-key" className="block text-sm font-medium text-slate-700 mb-2">
              Gemini API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your Gemini API Key"
              className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button onClick={handleSaveApiKey} className="px-6 py-2">
            Save API Key
          </Button>
        </section>

        {/* Language Settings */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-slate-700">Language Settings</h2>
          <div className="mb-4">
            <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 mb-2">
              Application Language
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          {/* The selected language is currently only logged to the console.
              Further integration would be needed to make it affect the application. */}
        </section>
      </div>
    </div>
  );
}
