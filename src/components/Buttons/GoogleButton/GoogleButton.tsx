"use client";
import React from "react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/SVGComponents/GoogleIcon";
function GoogleButton() {
  return (
    <Button
      onClick={() => {
        signIn("google"), { callbackUrl: "/home" };
      }}
      variant={"default"}
      className="  rounded-2xl "
    >

      <GoogleIcon />
      Sign in with Google
    </Button>
  );
}

export default GoogleButton;
