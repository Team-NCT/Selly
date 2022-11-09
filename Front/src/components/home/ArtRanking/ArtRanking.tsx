import { useState, useRef, useEffect, useCallback } from "react";
import style from "./ArtRanking.module.scss";
import { CardListItem } from "@/components/common";
import { LeftArrowIcon, RightArrowIcon } from "@/components/icon";
import { dummyData } from "./dummy";

const CAROUSEL_WIDTH = 3152;

const ArtRanking = () => {
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
        const calcWidth = (CAROUSEL_WIDTH - ulWidth) / 5;
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
    <section className={style.home_art}>
      <ul
        className={`${style.home_art_carousel} ${style[`step_${-(moveWidth * step)}`]}`}
        ref={ulRef}>
        {dummyData.map((item) => (
          <CardListItem
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            supply={item.supply}
          />
        ))}
      </ul>
      <button className={style.home_button_left} onClick={() => handleButtonClick("left")}>
        <LeftArrowIcon />
      </button>
      <button className={style.home_button_right} onClick={() => handleButtonClick("right")}>
        <RightArrowIcon />
      </button>
    </section>
  );
};

export default ArtRanking;
