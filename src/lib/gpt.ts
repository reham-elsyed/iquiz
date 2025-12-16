interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

import { GoogleGenAI, Schema } from "@google/genai";

// Define SchemaType enum if not provided by the library
enum SchemaType {
  STRING = "string",
  OBJECT = "object",
  ARRAY = "array",
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
export async function strict_output(prompt: string, type: string) {
  console.log(prompt, type, "wellcome to gemini config");
  try {
    let schema;
    if (type === "open_ended") {
      schema = {
        description: "List of open_ended questions",
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: {
              type: SchemaType.STRING,
              description: "question",
              nullable: false,
            },
            answer: {
              type: SchemaType.STRING,
              description: "answer",
              nullable: false,
            },
          },
          required: ["question", "answer"], // Use fields that are defined in properties
        },
      };
    } else if (type === "mcq") {
      schema = {
        description: "List of mcq questions",
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: {
              type: SchemaType.STRING,
              description: "question",
              nullable: false,
            },
            answer: {
              type: SchemaType.STRING,
              description: "the correct answer",
              nullable: false,
            },
            option1: {
              type: SchemaType.STRING,
              description: "option1 in mcq not the correct answer",
              nullable: false,
            },
            option2: {
              type: SchemaType.STRING,
              description: "option2 in mcq not the correct answer",
              nullable: false,
            },
            option3: {
              type: SchemaType.STRING,
              description: "option3 in mcq not the correct answer",
              nullable: false,
            },
          },
          required: ["question", "answer", "option1", "option2", "option3"], // Ensure required fields exist
        },
      };
    }

    // Helper function for exponential backoff and retries
    const callWithRetry = async (modelName: string, promptText: string, schemaObj: any, retries = 3, delay = 1000): Promise<any> => {
      try {
        console.log(`Attempting generateContent with model: ${modelName}`);
        const result = await ai.models.generateContent({
          model: modelName,
          config: {
            responseMimeType: "application/json",
            responseSchema: schemaObj as unknown as Schema,
          },
          contents: promptText,
        });

        if (!result || !result.text) {
          throw new Error("Empty response from AI");
        }
        return result;
      } catch (error: any) {
        console.error(`Error with model ${modelName}:`, error);

        // Check for rate limits (429) or server errors (503) to retry
        const isRateLimit =
          error.status === 429 ||
          error.code === 429 ||
          (error.message && (
            error.message.includes("429") ||
            error.message.includes("Quota") ||
            error.message.includes("Too Many Requests") ||
            error.message.includes("RESOURCE_EXHAUSTED")
          ));

        if (retries > 0 && isRateLimit) {
          console.log(`Rate limit/Quota hit for ${modelName}. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return callWithRetry(modelName, promptText, schemaObj, retries - 1, delay * 2);
        }
        throw error;
      }
    };

    let result;
    try {
      // Try with gemini-2.0-flash first
      result = await callWithRetry("gemini-2.5-flash", prompt, schema);
    } catch (error) {
      console.error("Primary model (gemini-1.5-flash) failed, trying fallback to gemini-2.0-flash...", error);
      // Fallback to secondary model
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait a bit before fallback
        result = await callWithRetry("gemini-2.0-flash", prompt, schema);
      } catch (fallbackError) {
        console.error("Fallback model also failed", fallbackError);
        throw fallbackError; // Rethrow to be handled by the caller
      }
    }

    console.log("AI Generation successful");
    return JSON.parse(result.text as string);
  } catch (error) {
    console.error("Error in strict_output:", error);
    throw error;
  }
}
