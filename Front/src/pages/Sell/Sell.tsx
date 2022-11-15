import { useState, useEffect } from "react";
import style from "./Sell.module.scss";
import { Neon } from "@/components/common";
import { SelectedCard, SellInfoForm, SellInfoCard } from "@/components/sell";
import { SelectSection, SignSection } from ".";
import { useAppSelector } from "@/hooks";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { getNFTsForOwnerAPI } from "@/api/blockchain";
import { selectAccount } from "@/store/loginSlice";

export type stepType = "SELECT" | "SIGN";

function Sell() {
  const [step, setStep] = useState<stepType>("SELECT");
  const [NFTdatas, setNFTdatas] = useState<any>("");
  const NFTValue = useAppSelector(selectNFTValue);
  const { address } = useAppSelector(selectAccount);

  const changeStep = (step: stepType) => {
    setStep(step);
    //* step 넘어갈 때 스크롤 맨 위로
    window.scrollTo(0, 0);
  };

  const getOwnERC721NFTs = async () => {
    if (!address) return;
    const { ownedNfts } = await getNFTsForOwnerAPI(address);
    let datas = [];
    datas = ownedNfts.filter((nft) => {
      return nft.tokenType === "ERC721";
    });
    console.log(datas);
    setNFTdatas(datas);
  };

  useEffect(() => {
    getOwnERC721NFTs();
  }, []);

  return (
    <main>
      <h1 className={style.sell_title}>
        <Neon color="muscat150" positionH="top" positionW="right" width={70} vertical={1}>
          Sell
        </Neon>
        <span className={style.title_span}>NFT</span>
      </h1>
      <article className={style.content}>
        {step === "SELECT" && <SelectSection datas={NFTdatas} changeStep={changeStep} />}
        {step === "SIGN" && <SignSection changeStep={changeStep} />}
      </article>
    </main>
  );
}

export default Sell;
