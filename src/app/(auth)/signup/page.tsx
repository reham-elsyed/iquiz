import GitHubButton from "@/components/GitHubButton/GitHubButton";
import GoogleButton from "@/components/GoogleButton/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="mt-34 rounded  py-10 px-10 md:mt-0 md:max-w-md md:px-14 dark:bg-background dark:text-foreground bg-secondary">
      <form method="POST" action={"api/auth/signup"}>
        <h1 className="text-xl font-semibold text-white">Sign Up</h1>
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            name="email"
            placeholder="email"
            className="bg-muted placeholder:text-grey-400 w-full inline-block text-muted-forground"
          />
          <Button className="w-full bg-[#e50914]">Sign Up</Button>
        </div>
      </form>
      <div className="text-grey-500 text-sm mt-2 ">
        <p className="text-grey-500 text-sm mt-2 ">Already Have account?</p>
        <Link
          className="btn border-l-stone-600 text-white hover:underline"
          href="/login"
        >
          Login Now
        </Link>
      </div>
      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        {/* <Button variant="outline" size="icon">
          <GitFork className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <GitFork className="w-4 h-4" />
        </Button> */}
        <GitHubButton />
        <GoogleButton />
      </div>
    </div>
  );
}
