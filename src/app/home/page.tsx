import { getAuthSession } from "@/lib/nextAuth"

export default async function  HomePage(){
  const session  = await getAuthSession()

  return(
    <div>hello

{session?.user.name}
    </div>
  )  
}