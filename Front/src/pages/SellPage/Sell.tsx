import React, { useState } from "react";
import { SelectCardList, SelectedCard } from "@/components/Sell";
import { SelectSection, SignSection } from "./";

type stepType = "SELECT" | "SIGN";

function Sell() {
  const [step, setStep] = useState<stepType>("SELECT");

  const changeStep = (step: stepType) => {
    setStep(step);
  };

  return (
    <main>
      <h1>Sell NFT</h1>
      <article className="content">
        <section className="select-section">
          <div className="step-button">
            <h2 onClick={() => changeStep("SELECT")}>판매 정보 등록</h2>
            <p>{">"}</p>
            <h2 onClick={() => changeStep("SIGN")}>서명하기</h2>
          </div>
          {step === "SELECT" && <SelectSection />}
          {step === "SIGN" && <SignSection />}
        </section>
        <section className="Selected-NFT-section">
          <h2>Selected NFT</h2>
          <SelectedCard
            url="https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            title="좀비와 함께 춤을"
          />
        </section>
      </article>
    </main>
  );
}

export default Sell;
