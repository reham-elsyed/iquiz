"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { GoogleIcon } from "@/components/SVGComponents/GoogleIcon"

interface GoogleButtonProps {
  text?: string
  callbackUrl?: string
}

export default function GoogleButton({ text = "Sign in with Google", callbackUrl = "/home" }: GoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl })
    } catch (error) {
      console.error("Google sign-in error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      variant="ghost"
      className="w-full h-12 text-xl app-button"
      aria-label={text}
      aria-busy={isLoading}
    >
      {!isLoading && <GoogleIcon />}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="sr-only">Signing in with Google</span>
          <span aria-hidden="true">Signing in...</span>
        </span>
      ) : (
        text
      )}
    </Button>
  )
}