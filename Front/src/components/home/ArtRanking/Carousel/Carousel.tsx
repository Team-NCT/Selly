import { useState, useRef, useEffect, useCallback } from "react";
import style from "./Carousel.module.scss";
import { CardListItem } from "@/components/common";
import { LeftArrowIcon, RightArrowIcon } from "@/components/icon";
import { NFTCardDataType } from "@/types/NFTData.types";

const CAROUSEL_WIDTH = 3152;

const Carousel = ({ data }: { data: NFTCardDataType[] }) => {
  const [step, setStep] = useState<number>(0);
  const [moveWidth, setMoveWidth] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);
  let timer: ReturnType<typeof setTimeout>;

  //@ description: 너비를 계산 하는 함수
  const calcUlWdith = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
    }

    /* eslint-disable */
    timer = setTimeout(() => {
      let ulWidth: number;
      if (ulRef.current) {
        ulWidth = ulRef.current.getBoundingClientRect().width;
        const calcWidth = (CAROUSEL_WIDTH - ulWidth) / 16 / 5;
        setMoveWidth(Math.round(calcWidth));
        setStep(0);
      }
    }, 200);
  }, [ulRef]);

  const handleButtonClick = (direction: "left" | "right") => {
    if (direction === "left") {
      if (step === 0) return;
      setStep((prev) => prev - 1);
      return;
    }
    if (step === 5) return;
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    calcUlWdith();
  }, [calcUlWdith]);

  //* 리사이즈 이벤트 발생시, 너비 다시 계산
  useEffect(() => {
    window.addEventListener("resize", calcUlWdith);

    return () => {
      window.removeEventListener("resize", calcUlWdith);
    };
  });

  return (
    <section className={style.home_art_carousel}>
      <ul
        className={`${style.home_art_carousel_window} ${style[`step_${-(moveWidth * step)}`]}`}
        ref={ulRef}>
        {data.map((item) => (
          <CardListItem
            key={item.articleId}
            articleId={item.articleId}
            articleName={item.articleName}
            articleImgUrl={item.articleImgUrl}
            presentSalePieceCnt={item.presentSalePieceCnt}
          />
        ))}
      </ul>
      <button
        className={style.home_art_carousel_button_left}
        onClick={() => handleButtonClick("left")}>
        <LeftArrowIcon />
      </button>
      <button
        className={style.home_art_carousel_button_right}
        onClick={() => handleButtonClick("right")}>
        <RightArrowIcon />
      </button>
    </section>
  );
};

export default Carousel;
