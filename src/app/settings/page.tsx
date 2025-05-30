'use client';
import { useContext, useState, useEffect } from 'react';
import { ApiKeyContext } from '@/context/ApiKeyContext';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { apiKey, setApiKey } = useContext(ApiKeyContext);
  const [key, setKey] = useState<string>(apiKey);

  useEffect(() => {
    setKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    setApiKey(key);
    alert('API key saved');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="mb-4">
        <label htmlFor="api-key" className="block text-sm font-medium text-slate-700 mb-1">
          Gemini API Key
        </label>
        <input
          id="api-key"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <Button onClick={handleSave} className="px-4 py-2">
        Save
      </Button>
    </div>
  );
}
