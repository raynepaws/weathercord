"use client";

import { getRandomTip } from "$/tips";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [random, setRandom] = useState<number | null>(null);

  useEffect(() => {
    setRandom(Math.random());
  }, [0]);

  return (
    <div className="w-screen h-screen p-2 flex flex-col gap-1 items-center justify-center">
      {random && (
        <>
          <img className="w-15" src="/Weathercord.svg" alt="Weathercord" />
          <sub><b>Tip:</b> {getRandomTip(random)}</sub>
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
