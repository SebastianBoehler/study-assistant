import React, { useEffect, useState } from 'react';
import { MultipleChoiceQuestion, Question, ShortAnswerQuestion } from '@/hooks/types';
import { MarkdownMath } from '@/components/ui/markdown-math';

interface QuestionDisplayProps {
  exam: {
    questions: Question[];
  };
}

export function QuestionDisplay({ exam }: QuestionDisplayProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<boolean>(false);
  const [shortAnswers, setShortAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<{ correct: number, total: number } | null>(null);

  useEffect(() => {
    if (exam) {
      setSubmittedAnswers(false);
      setSelectedAnswers({});
      setShowAnswers({});
      setExpandedAnswers({});
      setShortAnswers({});
      setScore(null);
    }
  }, [exam]);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    if (submittedAnswers) return; // Prevent changing answers after submission
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleShortAnswerChange = (questionId: number, text: string) => {
    if (submittedAnswers) return; // Prevent changing answers after submission
    
    setShortAnswers(prev => ({
      ...prev,
      [questionId]: text
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

  const handleSubmit = () => {
    setSubmittedAnswers(true);
    
    // Show all answers
    const allAnswersShown: Record<number, boolean> = {};
    exam.questions.forEach(q => {
      allAnswersShown[q.id] = true;
    });
    setShowAnswers(allAnswersShown);
    
    // Calculate score for multiple choice questions
    let correctCount = 0;
    let totalMultipleChoice = 0;
    
    exam.questions.forEach(question => {
      if (question.type === 'multiple_choice') {
        totalMultipleChoice++;
        if (selectedAnswers[question.id] === (question as MultipleChoiceQuestion).correctOptionIndex) {
          correctCount++;
        }
      }
    });
    
    setScore({
      correct: correctCount,
      total: totalMultipleChoice
    });
  };

  const renderMultipleChoiceQuestion = (question: MultipleChoiceQuestion) => {
    const isAnswered = selectedAnswers[question.id] !== undefined;
    const isCorrect = selectedAnswers[question.id] === question.correctOptionIndex;
    const showCorrectAnswer = submittedAnswers || showAnswers[question.id];
    
    return (
      <div className="mb-8">
        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">
            {question.id}. <MarkdownMath content={question.question} />
          </h3>
          <p className="text-xs text-slate-500 italic mb-4">Source: {question.source}</p>
        </div>
        
        <div className="mt-4 space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[question.id] === index;
            const isCorrectOption = index === question.correctOptionIndex;
            
            let optionClass = "p-3 rounded-md border cursor-pointer transition-colors ";
            
            if (showCorrectAnswer) {
              if (isCorrectOption) {
                optionClass += "bg-green-100 border-green-300 ";
              } else if (isSelected && !isCorrectOption) {
                optionClass += "bg-red-100 border-red-300 ";
              } else {
                optionClass += "bg-white border-slate-200 ";
              }
            } else {
              optionClass += isSelected 
                ? "bg-blue-100 border-blue-300 " 
                : "bg-white border-slate-200 hover:bg-slate-50 ";
            }
            
            return (
              <div 
                key={index}
                onClick={() => handleOptionSelect(question.id, index)}
                className={optionClass}
              >
                <div className="flex items-start">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 flex-shrink-0 ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-slate-700"><MarkdownMath content={option} /></span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex justify-between">
          {!submittedAnswers && (
            <button
              onClick={() => toggleShowAnswer(question.id)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showAnswers[question.id] ? 'Hide Answer' : 'Show Answer'}
            </button>
          )}
          
          {showCorrectAnswer && isAnswered && (
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
        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">
            {question.id}. <MarkdownMath content={question.question} />
          </h3>
          <p className="text-xs text-slate-500 italic mb-4">Source: {question.source}</p>
        </div>
        
        <div className="mt-4">
          <textarea
            className="w-full p-3 border border-slate-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your answer here..."
            value={shortAnswers[question.id] || ''}
            onChange={(e) => handleShortAnswerChange(question.id, e.target.value)}
            disabled={submittedAnswers}
          />
        </div>
        
        <div className="mt-2">
          {!submittedAnswers && (
            <button
              onClick={() => toggleShowAnswer(question.id)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showAnswers[question.id] ? 'Hide Model Answer' : 'Show Model Answer'}
            </button>
          )}
          
          {(submittedAnswers || showAnswers[question.id]) && (
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
                <MarkdownMath content={question.modelAnswer} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Generated Exam</h1>
      
      {score && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Exam Results</h2>
          <p className="text-blue-700">
            You scored {score.correct} out of {score.total} on multiple choice questions.
            {score.total > 0 && (
              <span className="ml-2">
                ({Math.round((score.correct / score.total) * 100)}%)
              </span>
            )}
          </p>
        </div>
      )}
      
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
      
      {!submittedAnswers && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
}
