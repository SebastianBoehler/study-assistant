# Study Assistant

A web application that helps you generate exams from your study materials using Google Cloud Storage and Gemini AI.

## Features

- Upload study materials (PDF, TXT, DOCX)
- Generate comprehensive exams based on uploaded content
- Beautiful and responsive UI
- Secure file handling with Google Cloud Storage

## Prerequisites

Before running the application, you need to:

1. Set up a Google Cloud Project
2. Create a Google Cloud Storage bucket
3. Get a Gemini AI API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_CREDENTIALS={"type": "service_account", ...}
GOOGLE_CLOUD_BUCKET=your-bucket-name
GOOGLE_AI_API_KEY=your-gemini-api-key
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click the file upload button to select your study materials
2. Choose one or multiple files (PDF, TXT, DOCX)
3. Click "Generate Exam"
4. Wait for the exam to be generated
5. View your personalized exam questions

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Google Cloud Storage
- Gemini AI API

## License

ISC
