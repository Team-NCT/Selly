import { useEffect, useState } from "react";

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const useCountNum = (end: number, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start.toString());
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);
  useEffect(() => {
    let currentNumber = start;
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame);

      if (end.toString().includes(".")) {
        const endList = end.toString().split(".");
        setCount(
          Math.round(Number(endList[0]) * progress).toLocaleString() +
            "." +
            Math.round(Number(endList[1]) * progress).toString()
        );
      } else {
        setCount(Math.round(end * progress).toLocaleString());
      }

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, frameRate, start, totalFrame]);

  return count;
};

export default useCountNum;
