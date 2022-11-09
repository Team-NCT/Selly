import { useState, useEffect } from "react";
import { throttle } from "lodash";

/**
 * @description
 * @ isFetching : 데이터 fetch 도중의 상태를 나타냅니다.
 * @ isFinished : 모든 데이터를 받아온 상태 변수 True일 경우 scroll 이벤트를 삭제합니다.
 * @example
 * const [isFetching, setIsFetching] = useInfiniteScroll(<데이터 fetch할 콜백 함수>)
 *
 * const <데이터 fetch할 콜백 함수> = () => {
 *  -- 데이터 fetch  --
 *  setIsFetching(false);
 * }
 *
 * return (
 *  <>
 *    ...
 *    {isFetching && "데이터 가져오는 중"}
 * </>)
 * ;
 */

const THROTTLE_WAIT = 300;

const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) {
      window.removeEventListener("scroll", scrollHandler);
      return;
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isFinished]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  const scrollHandler = throttle(() => {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    const paddingBottom = 10;

    if (currentScroll + windowHeight + paddingBottom < bodyHeight) return;
    setIsFetching(true);
  }, THROTTLE_WAIT);

  return { isFetching, setIsFetching, setIsFinished };
};

export default useInfiniteScroll;
