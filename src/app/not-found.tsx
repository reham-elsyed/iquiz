import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="modal-container h-[40vw] min-w-[70vw] lg:min-w-[60vw] flex flex-col items-center justify-center">
      <div className="relative w-full h-[30vw]">
        <Image
          fill
          src="/404 error with people holding the numbers-bro.svg"
          alt="not-found"
        />
      </div>
      <Button size="lg" className="">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
