"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { GoogleIcon } from "@/components/SVGComponents/GoogleIcon"
import Loading from "@/app/loading"

interface GoogleButtonProps {
  text?: string
  callbackUrl?: string
  icon: React.ReactNode
}

export default function LoginButton({ text = "Sign in with Google", callbackUrl = "/home", icon }: GoogleButtonProps) {
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
      className="w-full h-12 text-xl app-button  border border-ring"
      aria-label={text}
      aria-busy={isLoading}
    >
      {!isLoading && icon}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="sr-only">Signing in <Loading /></span>
          <span aria-hidden="true">Signing in...</span>
        </span>
      ) : (
        text
      )}
    </Button>
  )
}