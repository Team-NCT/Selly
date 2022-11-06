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
  };

  return (
    <main>
      <h1 className={style.sell_title}>
        <Neon color="muscat150" positionH="top" positionW="right">
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
          <SelectedCard url={NFTValue.articleUrl} title={NFTValue.testidx} />
          <SellInfoForm step={step} changeStep={changeStep} />
        </section>
      </article>
    </main>
  );
}

export default Sell;
