import { GoogleGenAI, File as GeminiFile, Part, createUserContent, createPartFromUri, GenerateContentConfig, GenerateContentParameters } from "@google/genai";

export const uploadFile = async (file: File, apiKey: string): Promise<GeminiFile> => {
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const result = await ai.files.upload({ file: file, config: { displayName: file.name } });

  return result;
};

const responseSchema = {
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
            description: "Array of 4 options for multiple choice questions",
          },
          correctOptionIndex: {
            type: "INTEGER",
            description: "Index (0-3) of the correct option for multiple choice questions",
          },
          modelAnswer: {
            type: "STRING",
            description: "Model answer for short answer questions in 3/4 sentences",
          },
          source: {
            type: "STRING",
            description: "Source information in the format 'PDF Name (page X)' where X is the page number",
          },
        },
        required: ["id", "type", "question", "source"],
      },
    },
  },
  required: ["questions"],
};

export const generateExam = async (apiKey: string, files: GeminiFile[], language: string, level: string, onlyMultipleChoice: boolean): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const contents = createUserContent([
    `Generate an exam in ${language} for ${level} level. ${onlyMultipleChoice ? "Only multiple choice questions." : ""}`,
    // map files
    ...files.map((f) => createPartFromUri(f.uri!, f.mimeType!)),
  ]);
  console.log(contents, files);
  const config: GenerateContentConfig = {
    responseMimeType: "application/json",
    temperature: 0.7,
    responseSchema,
  };
  const params: GenerateContentParameters = {
    model: "gemini-2.0-flash",
    contents,
    config,
  };
  const result = await ai.models.generateContent(params);
  const candidate = result.candidates?.[0];
  if (!candidate) {
    throw new Error("No candidate found");
  }
  const raw = candidate.content?.parts?.[0].text;
  if (!raw) {
    throw new Error("No raw content found");
  }
  console.log(raw);
  return JSON.parse(raw);
};
