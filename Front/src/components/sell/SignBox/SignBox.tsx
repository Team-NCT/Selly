import { useState } from "react";
import style from "./SignBox.module.scss";
import { SignBoxProps } from "./SignBox.types";
import { Neon, Button } from "@/components/common";
import { useAppSelector } from "@/hooks";
import { selectSignData } from "@/store/signDataSlice";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { selectSellInfo } from "@/store/sellInfoSlice";
import { selectAccount } from "@/store/loginSlice";

const SignBox = ({ title, desc, idx, isActive, signFunction, goNext, setValue }: SignBoxProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [signable, setSignable] = useState(true);
  const [buttonText, setButtonText] = useState("서명하기");

  const { address, userId } = useAppSelector(selectAccount);

  const { F_NFTCA } = useAppSelector(selectSignData);
  const { CA, tokenId, metaDataUrl, articleName, articleUrl } = useAppSelector(selectNFTValue);
  const { category, code, num, price } = useAppSelector(selectSellInfo);

  //TODO_YK: 마지막 함수에서는 서버API 불러오고(서버에서 트랜잭션 만들어줘야함) redux에 selectedNFT 정보 reset
  const onClickHandler = () => {
    if (!address || !userId) return;
    const userWallet = address;

    setSignable(false);
    setButtonText("서명 중");

    signFunction({
      CA,
      tokenId,
      num,
      articleName,
      code,
      F_NFTCA,
      setValue,
      userWallet,
      userId,
      metaDataUrl,
      articleUrl,
      category,
      price,
    }).then((res) => {
      if (res) {
        setIsCompleted(true);
        goNext(idx);
      } else {
        setButtonText("서명하기");
        setSignable(true);
        alert("블록체인 통신 상태 ERROR");
        console.error("블록체인 통신 상태 ERROR");
      }
    });
  };

  return (
    <div className={style.sign_box}>
      <div className={isActive || isCompleted ? style.sign_box_idx_active : style.sign_box_idx}>
        {idx}
      </div>
      <div className={style.sign_box_section}>
        <h1 className={style.sign_box_title}>
          <Neon
            color="muscat"
            positionH="top"
            positionW="right"
            width={isActive ? 60 : 0}
            height={70}
            horizontal={4}>
            {title}
          </Neon>
        </h1>
        <p className={style.sign_box_desc}>{desc}</p>
        {isActive && (
          <Button size="fillContainer" onClick={onClickHandler} disabled={!signable}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
export default SignBox;
