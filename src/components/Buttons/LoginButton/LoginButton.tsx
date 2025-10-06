"use client";
import { signIn } from "next-auth/react";
import { Button } from "../../ui/button";

export default function LoginButton({ text }: { text?: string }) {
  return (
    <Button
      onClick={() => {
        signIn("email"), { callbackUrl: "/home" };
      }}
      className="w-full rounded-2xl app-button "
    >
      {text ? text : "Login"}
    </Button>
  );
}
