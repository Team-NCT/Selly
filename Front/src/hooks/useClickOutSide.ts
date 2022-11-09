import { RefObject, useCallback, useEffect } from "react";

/**
 *
 * @description 특정 태그의 외부를 클릭 시, 콜백함수를 실행하는 함수
 * @param: ref: 특정 태그의 ref 값, callback: 외부를 클릭하면 실행할 콜백함수
 * 예시) useClickOutSide(formRef, () => setResultStatus(false));
 */
const useClickOutside = (ref: RefObject<any>, callback: () => void) => {
  const runCallback = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      if (target === null) {
        return;
      }

      if (ref.current && !ref.current.contains(target as HTMLDivElement)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("click", runCallback);

    return () => {
      document.removeEventListener("click", runCallback);
    };
  }, [runCallback]);
};

export default useClickOutside;
