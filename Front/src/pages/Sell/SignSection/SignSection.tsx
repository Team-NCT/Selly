import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/common";
import { SignBoxList } from "@/components/Sell";
import style from "./SignSection.module.scss";
import { SIGN_DATAS } from "./SignDatas";
import { useNavigate } from "react-router-dom";
import { setNFTValue, resetNFTValue } from "@/store/selectNFTSlice";
import { resetSellInfo } from "@/store/sellInfoSlice";
import { useAppDispatch, useCallbackPrompt } from "@/hooks";
import { closeConfirm } from "@/store/modalSlice";
import { default as ConfirmModal } from "./ConfirmModal";

function SignSection() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState<boolean>(true);
  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog);
  const el = document.getElementById("modal-root")!;

  useEffect(() => {
    return () => {
      dispatch(closeConfirm());
    };
  }, []);

  const listener = (event: BeforeUnloadEvent) => {
    console.log(event);
    console.log(typeof event);
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  const onclickHandler = () => {
    dispatch(resetNFTValue());
    dispatch(resetSellInfo());
    navigate("/");
  };
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
          <strong>진행한 단계를 돌이킬 수 없습니다.</strong>
        </h3>
      </header>
      <SignBoxList data={SIGN_DATAS} />
      <Button onClick={onclickHandler}>버튼</Button>
      {showPrompt &&
        createPortal(
          <ConfirmModal
            confirmNavigation={confirmNavigation}
            cancelNavigation={cancelNavigation}
          />,
          el
        )}
    </>
  );
}

export default SignSection;
