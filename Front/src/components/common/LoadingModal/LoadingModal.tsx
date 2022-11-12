import useInterval from "@/hooks/useInterval";
import { useState, useEffect } from "react";
import style from "./LoadingModal.module.scss";

const LoadingModal = () => {
  const [index, setIndex] = useState<number>(0);

  const desc1 = [
    "메타마스크 창이 뜨면 서명을 완료해주세요 🦊",
    "내가 그린 작품을 NFT로 민팅하고 인기 작가가 되어보세요!",
    "좋아하는 작가의 NFT를 조각으로 분할하여 소유해 보세요.",
    "다른 사람과 NFT 조각을 거래할 수 있어요.",
    "NFT의 지분이 50% 이상이라면 경매를 신청할 수 있어요.",
    "Setting에서 내 프로필을 꾸미고 나를 나타내 보세요.",
    "프로필에서 내가 가진 NFT와 내가 만든 NFT를 모아볼 수 있어요 🖼",
    "Selly에서 민팅하지 않은 NFT도 조각으로 분할해 판매할 수 있어요.",
    "잠시만 기다리시면 서명이 완료됩니다.",
  ];

  const desc2 = "서명이 끝날 때까지 사이트를 종료하지 말고 기다려주세요!";

  useInterval(() => {
    setIndex((prev) => {
      if (prev < 8) {
        return (prev += 1);
      } else {
        return 0;
      }
    });
  }, 4000);

  //* 모달이 켜졌을 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.loader}>
          <div className={style.loader_dot} />
          <div className={style.loader_dot} />
          <div className={style.loader_dot} />
          <div className={style.loader_dot} />
          <div className={style.loader_dot} />
          <div className={style.loader_dot} />
        </div>
        <div className={style.desc2}>{desc2}</div>
        <div className={style.desc1}>{desc1[index]}</div>
      </div>
    </div>
  );
};

export default LoadingModal;
