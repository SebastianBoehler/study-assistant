export interface FileInfo {
    file: File;
    gsUri?: string;
    status: 'uploading' | 'uploaded' | 'error';
    error?: string;
  }

export interface BaseQuestion {
  id: number;
  question: string;
  source: string;
  type: 'multiple_choice' | 'short_answer';
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correctOptionIndex: number;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer';
  modelAnswer: string;
}

export type Question = MultipleChoiceQuestion | ShortAnswerQuestion;