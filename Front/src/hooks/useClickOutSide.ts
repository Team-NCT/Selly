import { RefObject, useCallback } from "react";

/**
 *
 * @description 특정 태그의 외부를 클릭 시, 태그를 화면에서 안보이게 하는 함수
 * @param: ref: 특정 태그의 ref 값, closeFunc: 태그를 화면에서 안보이게 하는 함수
 * ex) const { disappearTag } = useClickOutSide(formRef, () => setResultStatus(false));
 *
 */
const useClickOutside = (ref: RefObject<any>, closeFunc: () => void) => {
  const disappearTag = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      if (target === null) {
        return;
      }

      if (ref.current && !ref.current.contains(target as HTMLDivElement)) {
        closeFunc();
      }
    },
    [ref, closeFunc]
  );

  return { disappearTag };
};

export default useClickOutside;
