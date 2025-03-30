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
});
