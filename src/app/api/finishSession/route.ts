import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import { NextResponse } from "next/server";

export async function Post(req: Request){
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json({error: "Unautherized"},{status: 401})
        }

        const { sessionId} = await req.json()

        const updated = await prisma.studySession.updateMany({
where:{
    id: sessionId,
    userId: session.user.id,
    status: 'ACTIVE'
},
data:{
    endedAt: new Date(),
    status: "FINISHED",
}
        })
        if (updated.count === 0) {
      return NextResponse.json({ error: "No session updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Study session finalized" });
    }catch(err){

    }

}