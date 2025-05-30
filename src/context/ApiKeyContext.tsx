'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

const localStorageKey = '%studyAssistantApiKey%';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: '',
  setApiKey: () => {},
});

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKeyState] = useState<string>('');

  useEffect(() => {
    const storedKey = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;
    if (storedKey) setApiKeyState(storedKey);
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem(localStorageKey, key);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
