import { useState, useRef, useEffect } from "react";
import style from "./ArtRanking.module.scss";
import { CardListItem } from "@/components/common";
import { LeftArrowIcon, RightArrowIcon } from "@/components/icon";

const dummyData = [
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "1",
    supply: 10000,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "2",
    supply: 0,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "3",
    supply: 10000,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "4",
    supply: 10000,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "5",
    supply: 10,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "6",
    supply: 0,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "7",
    supply: 10000,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "8",
    supply: 10000,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "9",
    supply: 10000,
  },
  {
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    title: "좀비와 함께 춤을",
    id: "10",
    supply: 77,
  },
];

const CAROUSEL_WIDTH = 3152;

const ArtRanking = () => {
  const [step, setStep] = useState<number>(0);
  const [moveWidth, setMoveWidth] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const calcUlWdith = () => {
    let ulWidth: number;
    if (ulRef.current) {
      ulWidth = ulRef.current.getBoundingClientRect().width;
      setMoveWidth((CAROUSEL_WIDTH - ulWidth) / 4);
    }
  };

  const handleButtonClick = (direction: "left" | "right") => {
    if (direction === "left") {
      if (step === 0) return;
      setStep((prev) => prev - 1);
      return;
    }
    if (step === 4) return;
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    calcUlWdith();
  }, [ulRef]);

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
