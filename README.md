# Study Assistant

A modern web application that helps you generate personalized exam questions from your study materials using Google Cloud Storage and AI. Upload your documents and get AI-generated questions to test your knowledge.

![Study Assistant Screenshot](/screenshots/image1.png)

## Features

- **Intuitive File Upload**: Drag and drop or browse for study materials
- **Multiple File Support**: Upload PDFs, DOCXs, TXTs, and other document formats
- **AI-Powered Exam Generation**: Create comprehensive exams based on your uploaded content
- **Clean, Modern UI**: Beautiful and responsive interface with sidebar navigation
- **Secure Cloud Storage**: Temporary file storage with Google Cloud Storage
- **Real-time Status Updates**: Track upload and generation progress
- **Multi-Language Support**: Generate exams in various languages including English, Spanish, German, French, and more
- **LaTeX Math Support**: Render mathematical formulas and equations with LaTeX notation

## Multi-Language Support

Study Assistant allows you to generate exams in multiple languages to support diverse learning needs:

![Spanish Exam Example](/screenshots/spanish.png)

## Prerequisites

Before running the application, you need to:

1. Set up a Google Cloud Project
2. Create a Google Cloud Storage bucket
3. Set up a Service Account with appropriate permissions
4. Enable Vertex AI API

## Setup Instructions

### Google Cloud Setup

1. Create a new project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Google Cloud Storage API
   - Vertex AI API
3. Create a Storage bucket:
   - Name: `study-assistant-uploads` (or your preferred name)
   - Location: Choose a location close to your users
   - Access control: Fine-grained
4. Create a Service Account:
   - Name: `study-assistant-sa`
   - Roles:
     - Storage Object Admin (for bucket access)
     - AI Platform User (for Vertex AI access)
5. Create and download a JSON key for the service account
   - Download the JSON key and save it as `credentials.json` in the root directory

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_BUCKET=your-bucket-name
GOOGLE_CLOUD_KEY_PATH=./credentials.json
GOOGLE_CLOUD_LOCATION=your-location
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/study-assistant.git
cd study-assistant
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn

# Using bun (recommended)
bun install
```

3. Run the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun (recommended)
bun dev
```

## Usage Guide

1. **Upload Study Materials**:

   - Drag and drop files into the upload area in the sidebar
   - Or click the upload area to browse for files
   - Supported formats: PDF, DOCX, TXT, PPT, etc.

2. **Review Uploaded Files**:

   - View the list of uploaded files in the sidebar
   - Check upload status (uploading, uploaded, error)
   - Remove files if needed by clicking the X button

3. **Generate Exam**:

   - Click the "Generate Exam" button in the sidebar
   - Wait for the AI to process your documents
   - This may take a few moments depending on the size and number of files

4. **Review Generated Exam**:
   - View the generated exam questions in the main content area
   - Questions are tailored to the content of your uploaded materials
   - Mathematical formulas are rendered using LaTeX notation

## Planned Features

- [ ] Export pre formatted for printing
- [ ] Replace vertex ai with google-genai
- [ ] Bring your own API key

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under a custom non-commercial license:

- You are free to use, modify, and publish copies of this software for personal use and individual academic research.
- Institutional use, including use by educational institutions, universities, or other organizations, is prohibited without permission.
- You may not use this software for commercial purposes without explicit permission from the author.
- Any distribution must include attribution to the original author and must maintain this license.
- The license terms may be updated at any time without prior notice.
- This software is provided "as is" without warranty of any kind.

See the [LICENSE](LICENSE) file for full details.

## Author

Sebastian Boehler

---

Made with ❤️ in Stuttgart
