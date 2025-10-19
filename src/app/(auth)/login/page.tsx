import LoginButton from "@/components/Buttons/LoginButton/LoginButton";
import Rocket from "@/components/SVGComponents/Rocket";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GithubIcon } from "@/components/SVGComponents/GitHubIcon"
import { GoogleIcon } from "@/components/SVGComponents/GoogleIcon";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return (
    <div className="flex flex-col gap-y-4  items-center p-5  rounded-2xl  app-card--raised ">
      <div className="flex flex-col justify-start items-start w-full  pb-4 app-card-content h-full">
        <div className="space-y-4 ">

          <h1 className="text-3xl font-bold tracking-tight leading-tight text-foreground">
            Welcome back
            <span className="inline-block ml-1 align-middle"><Rocket size={22} /></span>
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Ready to continue your learning journey?
          </p>

          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            Our AI will generate personalized quizzes and flashcards—designed to help you master every topic with confidence.
          </p>

          <TypingAnimation
            words={["create a test", "take the test", "evaluate Your performance",]}
            cursorStyle="underscore"
            loop
            className="text-3xl font-semibold text-primary"

          />

          <div className="pt-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Login to your account
            </h2>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center items-start gap-y-5 mt-6">

          <LoginButton text='Continue with GitHub' callbackUrl="/home" icon={<GithubIcon />} />
          <LoginButton text='Continue with Google' callbackUrl="/home" icon={<GoogleIcon />} />
        </div>
      </div>
    </div>
  );
}
