import { useRef, useEffect, useCallback, RefObject } from "react";

const useScrollCount = (end: number, start = 0, duration = 2000) => {
  const element: RefObject<HTMLSpanElement> = useRef(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const onScroll: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      const { current } = element;
      if (!entry.isIntersecting || !current) return;
      let currentNumber = start;
      const counter = setInterval(() => {
        currentNumber += 1;
        current.innerHTML = currentNumber.toString();
        if (currentNumber === end) {
          clearInterval(counter);
        }
      }, stepTime);
    },
    [end, start, stepTime, element]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.observe(element.current);
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
  };
};

export default useScrollCount;
