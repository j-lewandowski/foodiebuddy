import { EventHandler, useEffect, useRef, useState } from "react";
const RatingInput = () => {
  const [rating, setRating] = useState<number>(5.0);

  return (
    <div className="w-[60%] flex flex-col items-center justify-center relative">
      <input type="range" min={1} max={10} className="w-full bg-primary" />
    </div>
  );
};

export default RatingInput;
