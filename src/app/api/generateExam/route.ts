import { CitationMetadata, FileDataPart, GenerateContentRequest } from '@google-cloud/vertexai';
import { NextResponse } from 'next/server';
import { generativeModel } from '@/hooks/google';

interface FileInfo {
  name: string;
  gsUri: string;
  mimeType: string;
}

interface RequestBody { 
  files: FileInfo[]; 
  language: string; 
  level: string;
  onlyMultipleChoice: boolean;
};

export async function POST(request: Request) {
  try {
    const { files, language, level, onlyMultipleChoice } = await request.json() as RequestBody
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Create request content with text and file parts
    const textPart = {
      text: `Thats my course material. 
      Help me studying by generating exam questions. 
      Make the exam in "${language}" please. 
      The level of the exam should be "${level}".
      Generate at least 40 questions
      `
    };

    if (onlyMultipleChoice) {
      textPart.text += ` 
      Only generate multiple choice questions.`;
    }

    const fileParts = files.map(file => ({
      fileData: {
        fileUri: file.gsUri,
        mimeType: file.mimeType
      }
    })) as unknown as FileDataPart[];

    // Combine all parts
    const requestContent: GenerateContentRequest = {
      contents: [
        {
          role: 'user',
          parts: [textPart, ...fileParts]
        }
      ],
      generation_config: {
        //@ts-ignore
        response_schema: {
          type: "OBJECT",
          properties: {
            questions: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  id: { type: "INTEGER" },
                  type: { type: "STRING", enum: ["multiple_choice", "short_answer"] },
                  question: { type: "STRING" },
                  options: { 
                    type: "ARRAY", 
                    items: { type: "STRING" },
                    description: "Array of 4 options for multiple choice questions"
                  },
                  correctOptionIndex: { 
                    type: "INTEGER",
                    description: "Index (0-3) of the correct option for multiple choice questions" 
                  },
                  modelAnswer: { 
                    type: "STRING",
                    description: "Model answer for short answer questions in 3/4 sentences" 
                  },
                  source: {
                    type: "STRING",
                    description: "Source information in the format 'PDF Name (page X)' where X is the page number"
                  }
                },
                required: ["id", "type", "question", "source"]
              }
            }
          },
          required: ["questions"]
        },
        temperature: 0.3,
        //max_output_tokens: 8192 * 4, // max is 65535 for 2.5 pro
        response_mime_type: "application/json"
      }
    }

    // Generate exam using Vertex AI
    const result = await generativeModel.generateContent(requestContent);
    const response = result.response;

    // const citationMetadata: CitationMetadata | undefined = response.candidates[0].citationMetadata;
    // const { citationSources } = citationMetadata || {};
    // console.log(citationSources, citationMetadata);
    const exam = response.candidates[0].content.parts[0].text;
    if (!exam) throw new Error('Failed to generate exam');
      
    const parsedExam = JSON.parse(exam);

    return NextResponse.json({ exam: parsedExam });
  } catch (error) {
    console.error('Error generating exam:', error);
    return NextResponse.json(
      { error: 'Failed to generate exam' },
      { status: 500 }
    );
  }
}
