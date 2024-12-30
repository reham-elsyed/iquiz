import React, { useEffect } from "react";
type Props = {
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  setWrongAnswers: React.Dispatch<React.SetStateAction<number>>;
  setQuestuionIndex: React.Dispatch<React.SetStateAction<number>>;
};
export default function useReloade({
  setCorrectAnswers,
  setWrongAnswers,
  setQuestuionIndex,
}: Props) {
  return useEffect(() => {
    if (localStorage.getItem("correctAnswers")) {
      console.log(
        Number(JSON.parse(localStorage.getItem("correctAnswers") as string)),
      );
      setCorrectAnswers(
        Number(JSON.parse(localStorage.getItem("correctAnswers") as string)),
      );
    }

    if (localStorage.getItem("wrongAnswers")) {
      console.log(
        Number(JSON.parse(localStorage.getItem("wrongAnswers") as string)),
      );

      setWrongAnswers(
        Number(JSON.parse(localStorage.getItem("wrongAnswers") as string)),
      );
    }
    if (localStorage.getItem("questionIndex")) {
      setQuestuionIndex(
        Number(JSON.parse(localStorage.getItem("questionIndex") as string)),
      );
    }
  }, []);
}
