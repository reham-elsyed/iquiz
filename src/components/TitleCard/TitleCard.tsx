import React from "react";
type TitleCardProp = {
  topic: string;
};
const TitleCard = ({ topic }: TitleCardProp) => {
  return (
    <p>
      <span className="text-slate-400 mr-2">Topic</span>
      <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
        {topic}
      </span>
    </p>
  );
};

export default TitleCard;
