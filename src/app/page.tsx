import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await getServerSession(authOptions)
  if(!session){
    return redirect('/login')

  }
  else{
    return redirect('/home')
  }
return (
<>   
    <h1>{session?.user?.name}</h1>
    <h3>{session?.user?.email}</h3>
</>
    
  );
}
