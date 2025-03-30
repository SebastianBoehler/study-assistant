import { CitationMetadata, FileDataPart, GenerateContentRequest } from '@google-cloud/vertexai';
import { NextResponse } from 'next/server';
import { generativeModel } from '@/hooks/google';

interface FileInfo {
  name: string;
  gsUri: string;
  mimeType: string;
}

export async function POST(request: Request) {
  try {
    const { files } = await request.json() as { files: FileInfo[] };
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Create request content with text and file parts
    const textPart = {
      text: `You are an expert exam generator. Based on the provided study materials, create a comprehensive exam with 5 questions.
      Requirements:
      1. Include a mix of multiple choice (2 questions) and short answer questions (3 questions)
      2. Focus on testing understanding of key concepts and critical thinking
      3. For multiple choice questions, provide 4 options and indicate the correct answer
      4. For short answer questions, provide a model answer
      5. Format the response as a JSON structure according to the provided schema
      6. For each question, provide the source information in the format "PDF Name (page X)" where X is the page number

      **Provide specific source citations for each question including the exact page number**
      
      Please analyze the content of the attached files and generate appropriate questions.`
    };

    const fileParts = files.map(file => ({
      fileData: {
        fileUri: file.gsUri,
        mimeType: file.mimeType
      }
    })) as unknown as FileDataPart[];

    // Combine all parts
    const requestContent: GenerateContentRequest = {
      contents: [
        // {
        //   role: 'system',
        //   parts: [{ text: 'You are an expert exam generator.' }]
        // },
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
                    description: "Model answer for short answer questions" 
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
        temperature: 0.2,
        max_output_tokens: 8192,
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
