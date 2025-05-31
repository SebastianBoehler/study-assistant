'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ApiKeyContext } from '@/context/ApiKeyContext';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { apiKey, setApiKey, language, setLanguage } = useContext(ApiKeyContext);
  const [key, setKey] = useState<string>(apiKey);
  const [languageState, setLanguageState] = useState<string>(language);

  useEffect(() => {
    setKey(apiKey);
    setLanguageState(language);
  }, [apiKey, language]);

  const handleSave = () => {
    setApiKey(key);
    setLanguage(languageState);
    // Consider a more robust notification system in a real app
    alert('Settings saved!');
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 bg-white min-h-[60vh] md:min-h-0 py-6">
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
              value={languageState}
              onChange={(e) => setLanguageState(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="english">English</option>
              <option value="german">German</option>
              <option value="german_sächsisch">German (Sächsisch)</option>
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
        <Button onClick={handleSave} className="px-6 py-2">
          Save
        </Button>
      </div>
    </div>
  );
}
