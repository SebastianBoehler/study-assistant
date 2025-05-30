'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

const localStorageKey = '%studyAssistantApiKey%';
const localStorageLanguageKey = '%studyAssistantLanguage%';

interface ApiKeyContextType {
  apiKey: string;
  language: string;
  setApiKey: (key: string) => void;
  setLanguage: (language: string) => void;
}

export const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: '',
  language: '',
  setApiKey: () => {},
  setLanguage: () => {},
});

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [language, setLanguageState] = useState<string>('english');

  useEffect(() => {
    const storedKey = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;
    if (storedKey) setApiKeyState(storedKey);
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem(localStorageKey, key);
  };

  const setLanguage = (language: string) => {
    setLanguageState(language);
    localStorage.setItem(localStorageLanguageKey, language);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, language, setApiKey, setLanguage }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
