import React, { useMemo } from "react";
import keyword_extractor from "keyword-extractor";
type Props = {
  answer: string;
  input: React.RefObject<HTMLInputElement[]>;
  pkeyWords: React.Dispatch<React.SetStateAction<string[]>>;
};

function BlankAnswerComponent({ answer, input, pkeyWords }: Props) {
  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => Math.random() - 0.5);
    pkeyWords(shuffled.slice(0, 2));
    return shuffled.slice(0, 2);
  }, [answer]);
  const answerWithBlanks = useMemo(() => {
    const answerFormated = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, "_____");
    }, answer);
    return answerFormated;
  }, [keywords, answer]);
  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {" "}
        {answerWithBlanks.split("_____").flatMap((part, index) => [
          part,
          index < answerWithBlanks.split("_____").length - 1 && (
            <input
              ref={(el) => {
                if (el) {
                  (input.current as HTMLInputElement[])[index] = el; // Safe to assign because input.current is always an array
                }
              }}
              id={`${index}user-blank-input`}
              className="text-blue-950 text-center border-b border-black dark:text-yellow-200 dark:border-white w-28 focus:border-2 focus:border-b-4 focus:outline-hidden"
              key={index}
              type="text"
            />
          ),
        ])}
      </h1>
    </div>
  );
}

export default BlankAnswerComponent;
