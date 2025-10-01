"use client";
import React from "react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/SVGComponents/GoogleIcon";
function GoogleButton({ text }: { text?: string }) {
  return (
    <Button
      onClick={() => {
        signIn("google"), { callbackUrl: "/home" };
      }}
      variant={"default"}
      className="  rounded-2xl "
    >

      <GoogleIcon />
      {text ? text : "Sign in with Google"}
    </Button>
  );
}

export default GoogleButton;
