import React, { useState } from 'react';

interface QuestionOption {
  index: number;
  text: string;
  isCorrect: boolean;
}

interface BaseQuestion {
  id: number;
  question: string;
  source: string;
  type: 'multiple_choice' | 'short_answer';
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correctOptionIndex: number;
}

interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer';
  modelAnswer: string;
}

type Question = MultipleChoiceQuestion | ShortAnswerQuestion;

interface ExamData {
  questions: Question[];
}

interface QuestionDisplayProps {
  exam: {
    questions: Question[];
  };
}

export function QuestionDisplay({ exam }: QuestionDisplayProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleShowAnswer = (questionId: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleExpandAnswer = (questionId: number) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const renderMultipleChoiceQuestion = (question: MultipleChoiceQuestion) => {
    const isAnswered = selectedAnswers[question.id] !== undefined;
    const isCorrect = selectedAnswers[question.id] === question.correctOptionIndex;
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {question.id}. {question.question}
          </h3>
          <span className="text-xs text-slate-500 italic">{question.source}</span>
        </div>
        
        <div className="mt-4 space-y-2">
          {question.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(question.id, index)}
              className={`p-3 rounded-md border cursor-pointer transition-colors ${
                selectedAnswers[question.id] === index
                  ? showAnswers[question.id]
                    ? index === question.correctOptionIndex
                      ? 'bg-green-100 border-green-300'
                      : 'bg-red-100 border-red-300'
                    : 'bg-blue-100 border-blue-300'
                  : showAnswers[question.id] && index === question.correctOptionIndex
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 flex-shrink-0 ${
                  selectedAnswers[question.id] === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-slate-700">{option}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => toggleShowAnswer(question.id)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showAnswers[question.id] ? 'Hide Answer' : 'Show Answer'}
          </button>
          
          {isAnswered && showAnswers[question.id] && (
            <div className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderShortAnswerQuestion = (question: ShortAnswerQuestion) => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {question.id}. {question.question}
          </h3>
          <span className="text-xs text-slate-500 italic">{question.source}</span>
        </div>
        
        <div className="mt-4">
          <textarea
            className="w-full p-3 border border-slate-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your answer here..."
          />
        </div>
        
        <div className="mt-2">
          <button
            onClick={() => toggleShowAnswer(question.id)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showAnswers[question.id] ? 'Hide Model Answer' : 'Show Model Answer'}
          </button>
          
          {showAnswers[question.id] && (
            <div className="mt-3 bg-slate-50 p-4 rounded-md border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-slate-700">Model Answer:</h4>
                <button
                  onClick={() => toggleExpandAnswer(question.id)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  {expandedAnswers[question.id] ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className={`prose prose-sm max-w-none ${!expandedAnswers[question.id] && question.modelAnswer.length > 300 ? 'line-clamp-3' : ''}`}>
                {question.modelAnswer.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Generated Exam</h1>
      
      <div className="space-y-8">
        {exam.questions.map(question => (
          <div key={question.id} className="border-b border-slate-200 pb-6 last:border-0">
            {question.type === 'multiple_choice' 
              ? renderMultipleChoiceQuestion(question as MultipleChoiceQuestion)
              : renderShortAnswerQuestion(question as ShortAnswerQuestion)
            }
          </div>
        ))}
      </div>
    </div>
  );
}
