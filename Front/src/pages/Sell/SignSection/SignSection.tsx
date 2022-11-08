import React, { useState, useEffect } from "react";
import { SignBoxList } from "@/components/Sell";
import style from "./SignSection.module.scss";
import { SIGN_DATAS } from "./SignDatas";

function SignSection() {
  const listener = (event) => {
    console.log(event);
    const confirmationMessage = "정말 닫으시겠습니까?";
    event.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  useEffect(() => {
    console.log("sss??");
    return () => {
      console.log("ffffffff");
    };
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={style.step_title}>
          <h3 className={style.step_sell}>판매 정보 등록</h3>
          <div className={style.step_arrow}></div>
          <h3 className={style.step_sign}>서명하기</h3>
        </div>
        <h3 className={style.desc}>NFT 판매를 위해 아래의 단계에 서명을 진행하여야 합니다.</h3>
        <h3 className={style.desc}>
          단계가 완료되지 않은 상태에서 해당 페이지를 나가시면{" "}
          <strong>진행한 단계의 가스비를 돌이킬 수 없습니다.</strong>
        </h3>
      </header>
      <SignBoxList data={SIGN_DATAS} />
    </>
  );
}

export default SignSection;
