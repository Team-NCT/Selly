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
  const { account } = useAppSelector(selectAccount);

  const changeStep = (step: stepType) => {
    setStep(step);
    //* step 넘어갈 때 스크롤 맨 위로
    window.scrollTo(0, 0);
  };

  const getOwnERC721NFTs = async () => {
    if (!account.address) return;
    const { ownedNfts } = await getNFTsForOwnerAPI(account.address);
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
          {step === "SIGN" && <SignSection changeStep={changeStep} />}
        </section>
        <section className={style.selected_NFT_section}>
          <h2>Selected NFT</h2>
          <SelectedCard url={NFTValue.articleUrl} title={NFTValue.articleName} />
          {step === "SELECT" && <SellInfoForm changeStep={changeStep} />}
          {step === "SIGN" && <SellInfoCard />}
        </section>
      </article>
    </main>
  );
}

export default Sell;
