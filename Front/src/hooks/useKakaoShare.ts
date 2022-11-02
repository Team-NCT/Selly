import { useEffect } from "react";
import { KAKAO_APP_KEY } from "@/constants/kakao";

const useKakaoShare = () => {
  const kakaoShare = ({ title, id, imageUrl }: { title: string; id: number; imageUrl: string }) => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      //* 중복 initialization 방지
      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_APP_KEY);
      }

      //* 공유하기
      kakao.Link.sendCustom({
        templateId: 85221,
        templateArgs: {
          title,
          id,
          imageUrl,
        },
      });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { kakaoShare };
};

export default useKakaoShare;
