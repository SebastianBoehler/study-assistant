'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

const localStorageKey = '%studyAssistantApiKey%';
const localStorageLanguageKey = '%studyAssistantLanguage%';
const localStorageTemperatureKey = '%studyAssistantTemperature%';
const localStorageCustomPromptKey = '%studyAssistantCustomPrompt%';

interface ApiKeyContextType {
  apiKey: string;
  language: string;
  temperature: number;
  customPrompt: string;
  setApiKey: (key: string) => void;
  setLanguage: (language: string) => void;
  setTemperature: (temperature: number) => void;
  setCustomPrompt: (prompt: string) => void;
}

export const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: '',
  language: '',
  temperature: 0.5,
  customPrompt: '',
  setApiKey: () => {},
  setLanguage: () => {},
  setTemperature: () => {},
  setCustomPrompt: () => {},
});

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [language, setLanguageState] = useState<string>('english');
  const [temperature, setTemperatureState] = useState<number>(0.5);
  const [customPrompt, setCustomPromptState] = useState<string>('');

  useEffect(() => {
    const storedKey = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;
    if (storedKey) setApiKeyState(storedKey);
    const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem(localStorageLanguageKey) : null;
    if (storedLanguage) setLanguageState(storedLanguage);
    const storedTemperature = typeof window !== 'undefined' ? localStorage.getItem(localStorageTemperatureKey) : null;
    if (storedTemperature) setTemperatureState(parseFloat(storedTemperature));
    const storedCustomPrompt = typeof window !== 'undefined' ? localStorage.getItem(localStorageCustomPromptKey) : null;
    if (storedCustomPrompt) setCustomPromptState(storedCustomPrompt);
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem(localStorageKey, key);
  };

  const setLanguage = (language: string) => {
    setLanguageState(language);
    localStorage.setItem(localStorageLanguageKey, language);
  };

  const setTemperature = (temperature: number) => {
    setTemperatureState(temperature);
    localStorage.setItem(localStorageTemperatureKey, temperature.toString());
  };

  const setCustomPrompt = (prompt: string) => {
    setCustomPromptState(prompt);
    localStorage.setItem(localStorageCustomPromptKey, prompt);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, language, temperature, customPrompt, setApiKey, setLanguage, setTemperature, setCustomPrompt }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
