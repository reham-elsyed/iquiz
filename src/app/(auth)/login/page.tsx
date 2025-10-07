import GitHubButton from "@/components/Buttons/GitHubButton/GitHubButton";
import GoogleButton from "@/components/Buttons/GoogleButton/GoogleButton";
import LoginButton from "@/components/Buttons/LoginButton/LoginButton";
import Rocket from "@/components/SVGComponents/Rocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return (
    <div className="flex flex-col gap-y-4  items-center p-5  rounded-2xl  app-card--raised">
      <div className="flex flex-col justify-start items-start w-full  pb-4 app-card-content h-full">
        <div className="space-y-4 ">

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back <span className="inline-block"><Rocket size={20} /></span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to continue your learning journey?
          </p>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            Our AI will craft personalized quizzes and flashcards to help you master every topic with confidence.
          </p>


          <div className="pt-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Login to your account
            </h2>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center items-start gap-y-5 mt-6">

          <GitHubButton text='Continue with GitHub' />
          <GoogleButton text='Continue with Google' />
        </div>
      </div>
    </div>
  );
}
