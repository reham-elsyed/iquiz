// "use client";
// import React from "react";
// import { Button } from "../../ui/button";
// import { signIn } from "next-auth/react";

// import { FaGithub } from "react-icons/fa";
// import { GithubIcon } from "@/components/SVGComponents/GitHubIcon";
// function GitHubButton({ text }: { text?: string }) {
//   return (
//     <Button
//       onClick={() => {
//         signIn("github"), { callbackUrl: "/home" };
//       }}

//       className="  app-button w-full h-12  text-xl"

//     >
//       <GithubIcon />
//       {text}
//     </Button>
//   );
// }

// export default GitHubButton;

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { GithubIcon } from "@/components/SVGComponents/GitHubIcon"

interface GitHubButtonProps {
  text?: string
  callbackUrl?: string
}

export default function GitHubButton({ text = "Sign in with GitHub", callbackUrl = "/home" }: GitHubButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("github", { callbackUrl })
    } catch (error) {
      console.error("GitHub sign-in error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      variant="default"
      className="w-full h-12 text-xl app-button"
      aria-label={text}
      aria-busy={isLoading}
    >
      {!isLoading && <GithubIcon />}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="sr-only">Signing in with GitHub</span>
          <span aria-hidden="true">Signing in...</span>
        </span>
      ) : (
        text
      )}
    </Button>
  )
}

