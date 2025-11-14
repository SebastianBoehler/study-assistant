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

export const generateExam = async (
  apiKey: string,
  files: GeminiFile[],
  level: string = "medium",
  onlyMultipleChoice: boolean = false,
  language: string = "english",
  temperature: number = 0.5,
  customPrompt: string = "",
  questionCount: number = 40
): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const contents = createUserContent([
    `Generate an exam with at least ${questionCount} questions in ${language} for ${level} level. ${
      onlyMultipleChoice ? "Only multiple choice questions." : ""
    }`,
    // map files
    ...files.map((f) => createPartFromUri(f.uri!, f.mimeType!)),
  ]);
  console.log(contents, files);
  const config: GenerateContentConfig = {
    responseMimeType: "application/json",
    temperature: temperature,
    responseSchema,
    systemInstruction: `
You are a helpful teaching assistant that can generate exams based on study materials.

${customPrompt ? `Additional instructions: ${customPrompt}\n` : ""}

Rules:
- Only generate questions based on the study materials provided.
- All questions **must** be based on the study materials provided.
- Use teminology that is used in the study materials.
- DO NOT include source in the question as there is an extra field for it.
- Formulate questions in a way that the questions itself is not giving away the answer.

Evaluate the course material and ask questions that you would expect to be asked in an exam.
Test for topics and key concepts you deem most important for that course to pass
the exam and foster an understading from the key principles up.
First principles thinking is a good way to test for understanding.

If not specified to generate only multiple choice questions, 
generate 70% multiple choice questions and 30% short answer questions.

Apply scientific proven method for studying to maximazie learning effect and retention like:
- Spaced repetition
- Active recall
- Chunking
- Interleaving
- Self-explanation
- Testing effect
- Elaborative interrogation

Exam levels: Easy, Medium, Hard, Expert
If expert level is selected, generate questions that are hard to answer and require extensive thinking 
and deep knowledge to answer.

When appropiate you can formulate questions like cases:
You are in role of xy how would you solve that according to ... ?
`,
  };
  const params: GenerateContentParameters = {
    model: "gemini-2.5-pro-preview-05-06", // Updated model
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
  return JSON.parse(raw);
};
