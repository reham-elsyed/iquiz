"use client";
import React from "react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
function GoogleButton() {
  return (
    <Button
      onClick={() => {
        signIn("google"), { callbackUrl: "/home" };
      }}
      variant="outline"
      size="icon"
    >
      <FcGoogle size={30} />
    </Button>
  );
}

export default GoogleButton;
