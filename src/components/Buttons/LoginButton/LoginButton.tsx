"use client";
import { signIn } from "next-auth/react";
import { Button } from "../../ui/button";

export default function LoginButton() {
  return (
    <Button
      onClick={() => {
        signIn("email"), { callbackUrl: "/home" };
      }}
      className="w-full rounded-2xl  "
    >
      Login
    </Button>
  );
}
