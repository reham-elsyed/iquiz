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

    <button
      onClick={() => {
        setSelectedChoice(index);
      }}

      key={index}
      className={`${selectedChoice === index ? "bg-accent text-accent-foreground border border-blue-700" : "bg-background text-foreground hover:bg-background/30 hover:border hover:border-gray-600  "} w-full ps-3   py-8 mb-4 rounded-2xl justify-start `}
    >
      <div className="flex items-center justify-start ">
        <div className="p-2 px-3 mr-5 border rounded-2xl">{index + 1}</div>
        <div className="text-start">{option}</div>
      </div>
    </button>
  );
};

export default ChoicesButton;
