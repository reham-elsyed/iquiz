import { studySessionInterface } from "@/types/feedbackFlashcardTypes";
import prisma from "./db";

  const createStudySession = async (payload) => {
    try{
  const newSession = await prisma.studySession.create({
      data: {
        userId:payload.userId,
        gameId: payload.gameId,
        status:payload.status,
      },
    });
    if(!newSession){
        return {error: "something went wrong"}
    }
    return newSession
    }catch(err){
        console.log(err,"error from new study session function")
    }
     

    };
    export default createStudySession;
 