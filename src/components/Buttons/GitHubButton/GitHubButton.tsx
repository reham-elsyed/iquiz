"use client";
import React from "react";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
function GitHubButton() {
  return (
    <Button
      onClick={() => {
        signIn("github"), { callbackUrl: "/home" };
      }}
      variant="outline"
      size="icon"
    >
      <FaGithub size={30} />
    </Button>
  );
}

export default GitHubButton;
