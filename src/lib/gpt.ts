interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string) ;
export async function strict_output(prompt:string, type: string){
  console.log(prompt, type, "wellcome to gemini config")
  try{
    let schema;
    if (type === "open_ended"){
       schema = {
        description: "List of open_ended questions",
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: {
              type: SchemaType.STRING,
              description:"question" ,
              nullable: false,
            },
            answer: {
              type: SchemaType.STRING,
              description:"answer" ,
              nullable: false,
            },
    
          },
          required: ["question", "answer"], // Use fields that are defined in properties

       },
      };
    }
    else if (type === 'mcq'){
      schema = {
        description: "List of mcq questions",
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: {
              type: SchemaType.STRING,
              description:"question" ,
              nullable: false,
            },
            answer: {
              type: SchemaType.STRING,
              description:"the correct answer" ,
              nullable: false,
            },
            option1:{
              type: SchemaType.STRING,
              description:"option1 in mcq not the correct answer" ,
              nullable: false,
            },
            option2:{
              type: SchemaType.STRING,
              description:"option2 in mcq not the correct answer" ,
              nullable: false,
            },
            option3:{
              type: SchemaType.STRING,
              description:"option3 in mcq not the correct answer" ,
              nullable: false,
            },
            
    
          },
          required: ["question", "answer", "option1", "option2", "option3"], // Ensure required fields exist
        },
      };
    }
     
      
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });
      
      const result = await model.generateContent(
       prompt,
      );

      console.log(result.response.text());
    return JSON.parse(result.response.text());
    } catch(error){
      console.log(error)
      
    }

  
}
