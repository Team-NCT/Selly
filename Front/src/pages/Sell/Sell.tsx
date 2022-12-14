import { useState, useEffect, useCallback } from "react";
import style from "./Sell.module.scss";
import { Neon } from "@/components/common";
import { SelectSection, SignSection } from ".";
import { useAppSelector, useAppDispatch, useAlert, OpenAlertArg } from "@/hooks";
import { resetNFTValue } from "@/store/selectNFTSlice";
import { resetSellInfo } from "@/store/sellInfoSlice";
import { getMySellyNfts, getNFTsForOwnerAPI } from "@/api/blockchain";
import { selectAccount } from "@/store/loginSlice";
import { resetSignData } from "@/store/signDataSlice";
import { SELLY_ERC_721_CA } from "@/constants/blockchain";
import { CollectedNFTType } from "@/types/NFTData.types";

export type stepType = "SELECT" | "SIGN";

function Sell() {
  const [step, setStep] = useState<stepType>("SELECT");
  const [NFTdatas, setNFTdatas] = useState<CollectedNFTType[] | null>(null);
  const { address, userId } = useAppSelector(selectAccount);
  const { openAlertModal } = useAlert();
  const dispatch = useAppDispatch();

  const changeStep = (step: stepType) => {
    setStep(step);
    //* step 넘어갈 때 스크롤 맨 위로
    window.scrollTo(0, 0);
  };

  const getOwnERC721NFTs = useCallback(async () => {
    if (!address || !SELLY_ERC_721_CA || !userId) return;
    const sellyDatas = await getMySellyNfts({ CA: SELLY_ERC_721_CA, userWallet: address });
    const alchemyDatas = await getNFTsForOwnerAPI(address);
    console.log("셀리 데이터!!", sellyDatas, "외부 데이터!", alchemyDatas);
    if (!sellyDatas) {
      const data: OpenAlertArg = {
        content: "에러가 발생했습니다.",
        style: "error",
        icon: false,
      };
      openAlertModal(data);
      setNFTdatas([]);
      return;
    }
    setNFTdatas(sellyDatas.concat(alchemyDatas));
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
