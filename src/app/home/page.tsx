import LoadingQuestions from "@/components/LoadingQuestions/LoadingQuestions"
import { getAuthSession } from "@/lib/nextAuth"

export default async function  HomePage(){
  const session  = await getAuthSession()

  return(
    <div>hello

{session?.user.name}
<LoadingQuestions/>
    </div>
  )  
}