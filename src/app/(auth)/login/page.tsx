import GitHubButton from "@/components/Buttons/GitHubButton/GitHubButton";
import GoogleButton from "@/components/Buttons/GoogleButton/GoogleButton";
import LoginButton from "@/components/Buttons/LoginButton/LoginButton";
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
    <div className="flex flex-col gap-y-4   items-center p-5 w-full ">
      <form method="POST" action={"/api/auth/signin"}
        className="flex flex-col gap-y-4 w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-forground">Login</h1>
        <div className="mt-5">
          <Input
            type="email"
            name="email"
            placeholder="email"
            className=" rounded-2xl border border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="">
          <LoginButton />
        </div>

      </form>

      <div className="flex flex-col justify-center items-start w-full max-w-sm pb-4 border-b border-gray-300 dark:border-gray-700">
        <p className="text-grey-500 text-sm mt-2 ">Or You  can log in with:</p>
        <div className="flex flex-col w-full justify-center items-center gap-y-3 mt-6">

          <GitHubButton text='Sign in with GitHub' />
          <GoogleButton text='Sign in with Google' />
        </div>
      </div>
      <div className="text-grey-500 text-sm mt-2 flex flex-col justify-center items-start w-full max-w-sm ">
        <p className="text-grey-500 text-sm mt-2 ">New To IQuiz?</p>
        <Link
          className="btn border-l-stone-600 text-forground hover:underline"
          href="/signup"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
