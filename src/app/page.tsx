import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const metadata = {
  title: "Home| IQuiz",

};
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  } else {
    return redirect("/home");
  }
 
}
