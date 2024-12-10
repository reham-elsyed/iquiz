import { getServerSession } from "next-auth";
import { authOptions } from "./nextAuth";
import { redirect } from "next/navigation";

export default async function YouAreAutherized(){
    const session = await getServerSession(authOptions)
    if (session){
        redirect('/home')
    }
}