import { Storage } from '@google-cloud/storage';
import { VertexAI } from '@google-cloud/vertexai';

// Check for required environment variables
if (!process.env.GOOGLE_CLOUD_PROJECT) {
  throw new Error('GOOGLE_CLOUD_PROJECT environment variable is not defined');
}

if (!process.env.GOOGLE_CLOUD_BUCKET) {
  throw new Error('GOOGLE_CLOUD_BUCKET environment variable is not defined');
}

if (!process.env.GOOGLE_CLOUD_LOCATION) {
  throw new Error('GOOGLE_CLOUD_LOCATION environment variable is not defined');
}

// Initialize Google Cloud Storage
export const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_PATH || './credentials.json',
});

// Initialize bucket
export const bucketName = process.env.GOOGLE_CLOUD_BUCKET;
export const bucket = storage.bucket(bucketName);

// Initialize Vertex AI
export const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION,
  googleAuthOptions: {
    keyFilename: process.env.GOOGLE_CLOUD_KEY_PATH || './credentials.json',
  }
});

// Get the generative model
export const generativeModel = vertexAI.preview.getGenerativeModel({
  model: 'gemini-2.5-pro-exp-03-25',
  // Optional parameters
  generation_config: {
    max_output_tokens: 1024,
    temperature: 0.7,
  },
  // @ts-ignore
  systemInstruction: {
    role: 'system',
    parts: [{"text": `
      You are an expert exam generator. An ask questions in a way to maximize understanding and critical thinking.
      Question asking is based on scientific principles and best practices to maintain and enhance learning.
      Ask questions in a way the student doesnt need more context to answer the question.
      Cover all topics in the uploaded documents.
      Generate 70% multiple choice and 30% short answer questions.

      For multiple choice questions, provide 4 options and indicate the correct answer
      For each question, provide the source information in the format "PDF Name (page X)" where X is the page number
    `}]
  },
});
