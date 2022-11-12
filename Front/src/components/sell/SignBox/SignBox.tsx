import { useState } from "react";
import style from "./SignBox.module.scss";
import { SignBoxProps } from "./SignBox.types";
import { Neon, Button } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectSignData, setF_NFTCA, setF_NFTSaleCA } from "@/store/signDataSlice";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { selectSellInfo } from "@/store/sellInfoSlice";

import {
  testEventContract,
  sellyERC721Contract,
  F_NFTFactoryContract,
  F_NFTContract,
  F_NFT_SaleContract,
} from "@/api/blockchain/web3Config";

const SignBox = ({ title, desc, idx, isActive, signFunction, goNext, setValue }: SignBoxProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [signable, setSignable] = useState(true);
  const [buttonText, setButtonText] = useState("서명하기");

  const { F_NFTCA, F_NFTSaleCA } = useAppSelector(selectSignData);
  const { CA, tokenId, metaDataUrl, articleName, articleUrl } = useAppSelector(selectNFTValue);
  const { category, code, num, price } = useAppSelector(selectSellInfo);

  const testHandler = async () => {
    const response = await sellyERC721Contract("0xe6842912f4Da47484D695D4c97a939777738F67E")
      .methods.createMine("SSSSS")
      .send({ from: window.ethereum.selectedAddress });

    console.log(response);
  };

  // TODO_YK: 마지막은 백엔드랑 통신
  const onClickHandler = () => {
    console.log(signFunction);
    setSignable(false);
    setButtonText("서명 중");
    if (idx === 4) {
      console.log("백엔드 통신");
    } else {
      signFunction({ CA, tokenId, num, articleName, code, F_NFTCA, setValue }).then((res) => {
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
    }
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
      <Button onClick={testHandler}>경매</Button>
    </div>
  );
};
export default SignBox;
