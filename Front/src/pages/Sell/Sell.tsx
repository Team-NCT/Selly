import React, { useState, useEffect } from "react";
import style from "./Sell.module.scss";
import { Neon } from "@/components/common";
import { SelectedCard, SellInfoForm } from "@/components/Sell";
import { SelectSection, SignSection } from ".";
import { useAppSelector } from "@/hooks";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { getNFTsForOwnerAPI } from "@/api/blockchain";

export type stepType = "SELECT" | "SIGN";

function Sell() {
  const [step, setStep] = useState<stepType>("SELECT");
  const [NFTdatas, setNFTdatas] = useState<any>("");
  const NFTValue = useAppSelector(selectNFTValue);

  const changeStep = (step: stepType) => {
    setStep(step);
    //* step 넘어갈 때 스크롤 맨 위로
    window.scrollTo(0, 0);
  };

  const getOwnERC721NFTs = async () => {
    const { ownedNfts } = await getNFTsForOwnerAPI("sss");
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
        <Neon color="muscat150" positionH="top" positionW="left" vertical={0} width={48}>
          Sell NFT
        </Neon>
      </h1>
      <article className={style.content}>
        <section className={style.select_section}>
          {step === "SELECT" && <SelectSection datas={NFTdatas} />}
          {step === "SIGN" && <SignSection />}
        </section>
        <section className={style.selected_NFT_section}>
          <h2>Selected NFT</h2>
          <SelectedCard url={NFTValue.articleUrl} title={NFTValue.articleName} />
          <SellInfoForm step={step} changeStep={changeStep} />
        </section>
      </article>
    </main>
  );
}

export default Sell;
