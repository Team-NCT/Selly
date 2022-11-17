import { useState, useEffect, useCallback } from "react";
import style from "./Sell.module.scss";
import { Neon } from "@/components/common";
import { SelectSection, SignSection } from ".";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { resetNFTValue } from "@/store/selectNFTSlice";
import { resetSellInfo } from "@/store/sellInfoSlice";
import { getNFTsForOwnerAPI } from "@/api/blockchain";
import { selectAccount } from "@/store/loginSlice";
import { resetSignData } from "@/store/signDataSlice";

export type stepType = "SELECT" | "SIGN";

function Sell() {
  const [step, setStep] = useState<stepType>("SELECT");
  const [NFTdatas, setNFTdatas] = useState<any>(null);
  const { address, userId } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  const changeStep = (step: stepType) => {
    setStep(step);
    //* step 넘어갈 때 스크롤 맨 위로
    window.scrollTo(0, 0);
  };

  const getOwnERC721NFTs = useCallback(async () => {
    if (!address || !userId) return;
    const datas = await getNFTsForOwnerAPI(address);
    console.log(datas);
    setNFTdatas(datas);
  }, [userId, address]);

  //* 계정 바뀌면 데이터 리셋
  useEffect(() => {
    getOwnERC721NFTs();
    dispatch(resetNFTValue());
    dispatch(resetSellInfo());
    dispatch(resetSignData());
    setStep("SELECT");
  }, [userId, getOwnERC721NFTs, dispatch]);

  return (
    <main>
      <h1 className={style.sell_title}>
        <Neon color="muscat150" positionH="top" positionW="right" width={70} vertical={1}>
          Sell
        </Neon>
        <span className={style.title_span}>NFT</span>
      </h1>
      <article className={style.content}>
        {step === "SELECT" && (
          <SelectSection datas={NFTdatas} changeStep={changeStep} userId={userId} />
        )}
        {step === "SIGN" && <SignSection changeStep={changeStep} />}
      </article>
    </main>
  );
}

export default Sell;
