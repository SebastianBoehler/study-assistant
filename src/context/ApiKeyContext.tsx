'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

const localStorageKey = '%studyAssistantApiKey%';
const localStorageLanguageKey = '%studyAssistantLanguage%';
const localStorageTemperatureKey = '%studyAssistantTemperature%';
const localStorageCustomPromptKey = '%studyAssistantCustomPrompt%';
const localStorageQuestionCountKey = '%studyAssistantQuestionCount%';

interface ApiKeyContextType {
  apiKey: string;
  language: string;
  temperature: number;
  customPrompt: string;
  questionCount: number;
  setApiKey: (key: string) => void;
  setLanguage: (language: string) => void;
  setTemperature: (temperature: number) => void;
  setCustomPrompt: (prompt: string) => void;
  setQuestionCount: (count: number) => void;
}

export const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: '',
  language: '',
  temperature: 0.5,
  customPrompt: '',
  questionCount: 40,
  setApiKey: () => {},
  setLanguage: () => {},
  setTemperature: () => {},
  setCustomPrompt: () => {},
  setQuestionCount: () => {},
});

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [language, setLanguageState] = useState<string>('english');
  const [temperature, setTemperatureState] = useState<number>(0.5);
  const [customPrompt, setCustomPromptState] = useState<string>('');
  const [questionCount, setQuestionCountState] = useState<number>(40);

  useEffect(() => {
    const storedKey = typeof window !== 'undefined' ? localStorage.getItem(localStorageKey) : null;
    if (storedKey) setApiKeyState(storedKey);
    const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem(localStorageLanguageKey) : null;
    if (storedLanguage) setLanguageState(storedLanguage);
    const storedTemperature = typeof window !== 'undefined' ? localStorage.getItem(localStorageTemperatureKey) : null;
    if (storedTemperature) setTemperatureState(parseFloat(storedTemperature));
    const storedCustomPrompt = typeof window !== 'undefined' ? localStorage.getItem(localStorageCustomPromptKey) : null;
    if (storedCustomPrompt) setCustomPromptState(storedCustomPrompt);
    const storedQuestionCount = typeof window !== 'undefined' ? localStorage.getItem(localStorageQuestionCountKey) : null;
    if (storedQuestionCount) setQuestionCountState(parseInt(storedQuestionCount, 10));
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

  const setQuestionCount = (count: number) => {
    setQuestionCountState(count);
    localStorage.setItem(localStorageQuestionCountKey, count.toString());
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, language, temperature, customPrompt, questionCount, setApiKey, setLanguage, setTemperature, setCustomPrompt, setQuestionCount }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
