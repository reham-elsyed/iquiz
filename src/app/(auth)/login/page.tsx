import GitHubButton from "@/components/GitHubButton/GitHubButton";
import GoogleButton from "@/components/GoogleButton/GoogleButton";
import LoginButton from "@/components/LoginButton/LoginButton";
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
    <div className="mt-34 rounded dark:bg-background dark:text-foreground bg-secondary py-10 px-10 md:mt-0 md:max-w-md md:px-14">
      <form method="POST" action={"/api/auth/signin"}>
        <h1 className="text-xl font-semibold text-white">Login</h1>
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            name="email"
            placeholder="email"
            className="bg-muted placeholder:text-grey-400 w-full inline-block text-muted-forground"
          />
          <div className="w-full h-full">
            <LoginButton />
          </div>
        </div>
      </form>
      <div className="text-grey-500 text-sm mt-2 ">
        <p className="text-grey-500 text-sm mt-2 ">New To IQuiz?</p>
        <Link
          className="btn border-l-stone-600 text-white hover:underline"
          href="/signup"
        >
          Sign Up
        </Link>
      </div>
      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        <GitHubButton />
        <GoogleButton />
      </div>
    </div>
  );
}
