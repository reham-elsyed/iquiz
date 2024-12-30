import { Fn } from "@prisma/client/runtime/library";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  setSelectedChoice: (selectedChoice: number) => void;
  selectedChoice: number;

  option: string;
  index: number;
};

const ChoicesButton = ({
  index,
  setSelectedChoice,
  selectedChoice,
  option,
}: Props) => {
  return (
    <Button
      onClick={() => {
        setSelectedChoice(index);
      }}
      variant={selectedChoice === index ? "destructive" : "secondary"}
      key={index}
      className="justify-start w-full py-8 mb-4 "
    >
      <div className="flex items-center justify-start">
        <div className="p-2 px-3 mr-5 border rounded-md">{index + 1}</div>
        <div className="text-start">{option}</div>
      </div>
    </Button>
  );
};

export default ChoicesButton;
