'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ApiKeyContext } from '@/context/ApiKeyContext';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { apiKey, setApiKey, language, setLanguage, temperature, setTemperature, customPrompt, setCustomPrompt } = useContext(ApiKeyContext);
  const [key, setKey] = useState<string>(apiKey);
  const [languageState, setLanguageState] = useState<string>(language);
  const [temperatureState, setTemperatureState] = useState<number>(temperature);
  const [customPromptState, setCustomPromptState] = useState<string>(customPrompt);

  useEffect(() => {
    setKey(apiKey);
    setLanguageState(language);
    setTemperatureState(temperature);
    setCustomPromptState(customPrompt);
  }, [apiKey, language, temperature, customPrompt]);

  const handleSave = () => {
    setApiKey(key);
    setLanguage(languageState);
    setTemperature(temperatureState);
    setCustomPrompt(customPromptState);
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

        {/* Model Settings */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-slate-700">Model Settings</h2>
          <div className="mb-6">
            <label htmlFor="temperature-slider" className="block text-sm font-medium text-slate-700 mb-2">
              Temperature: {temperatureState.toFixed(2)}
            </label>
            <input
              id="temperature-slider"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperatureState}
              onChange={(e) => setTemperatureState(parseFloat(e.target.value))}
              className="w-full max-w-md h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1 max-w-md">
              <span>0 (Focused)</span>
              <span>1 (Balanced)</span>
              <span>2 (Creative)</span>
            </div>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Controls the randomness of the model&apos;s responses. Lower values make responses more focused and deterministic, while higher values make them more creative and varied.
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="custom-prompt" className="block text-sm font-medium text-slate-700 mb-2">
              Custom Prompt (Optional)
            </label>
            <textarea
              id="custom-prompt"
              value={customPromptState}
              onChange={(e) => setCustomPromptState(e.target.value)}
              rows={4}
              placeholder="Add specific instructions for the model (e.g., 'Focus on practical applications', 'Include more case studies', 'Emphasize theoretical concepts')"
              className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Additional instructions that guide the model toward specific content or focus areas when generating exam questions.
            </p>
          </div>
        </section>

        <Button onClick={handleSave} className="px-6 py-2">
          Save
        </Button>
      </div>
    </div>
  );
}
