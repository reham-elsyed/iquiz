import { Fn } from "@prisma/client/runtime/library";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  setSelectedChoice?: (selectedChoice: number) => void;
  selectedChoice?: number;

  option: string;
  index: number;
};

const ChoicesButton = ({
  index,
  setSelectedChoice = (prev) => prev,
  selectedChoice,
  option,
}: Props) => {
  return (

    <button
      onClick={() => {
        setSelectedChoice(index);
      }}

      key={index}
      className={`${selectedChoice === index ? "bg-accent border-2 border-ring" : ""} w-full ps-3 app-card   py-4 mb-4 rounded-2xl justify-start `}
    >
      <div className="flex items-center justify-start ">
        <div className="p-2 px-3 mr-5 border rounded-2xl">{index + 1}</div>
        <div className="text-start text-lg">{option}</div>
      </div>
    </button>
  );
};

export default ChoicesButton;
