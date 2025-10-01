"use client";
import React from "react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { GithubIcon } from "@/components/SVGComponents/GitHubIcon";
function GitHubButton() {
  return (
    <Button
      onClick={() => {
        signIn("github"), { callbackUrl: "/home" };
      }}

      className=" rounded-2xl "

    >
      <GithubIcon />
      Sign in with GitHub
    </Button>
  );
}

export default GitHubButton;
