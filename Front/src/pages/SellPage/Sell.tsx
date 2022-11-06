import React, { useState } from "react";
import style from "./Sell.module.scss";
import { Neon, SelectedCard, SellInfoForm } from "@/components";
import { SelectSection, SignSection } from "./";
import { useAppSelector } from "@/hooks";
import { selectNFTValue } from "@/store/selectNFTSlice";

export type stepType = "SELECT" | "SIGN";

function Sell() {
  const [step, setStep] = useState<stepType>("SELECT");
  const NFTValue = useAppSelector(selectNFTValue);

  const changeStep = (step: stepType) => {
    setStep(step);
    //* step 넘어갈 때 스크롤 맨 위로
    window.scrollTo(0, 0);
  };

  return (
    <main>
      <h1 className={style.sell_title}>
        <Neon color="muscat150" positionH="top" positionW="left" vertical={0} width={48}>
          Sell NFT
        </Neon>
      </h1>
      <article className={style.content}>
        <section className={style.select_section}>
          {step === "SELECT" && <SelectSection />}
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
