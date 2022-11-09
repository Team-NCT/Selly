import { useState, useEffect } from "react";
import { throttle } from "lodash";

const THROTTLE_WAIT = 300;

const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  const scrollHandler = throttle(() => {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    const paddingBottom = 50;

    if (currentScroll + windowHeight + paddingBottom < bodyHeight) return;
    setIsFetching(true);
  }, THROTTLE_WAIT);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
