import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./SignSection.module.scss";
import { useAppSelector, useCallbackPrompt } from "@/hooks";
import { selectModal } from "@/store/modalSlice";
import { SignBoxList, ConfirmModal, SellInfoCard, SelectedCard } from "@/components/sell";
import { SIGN_DATAS } from "./SignDatas";
import { stepType } from "@/pages/Sell/Sell";
import { selectNFTValue } from "@/store/selectNFTSlice";

export interface SignSectionProps {
  changeStep: (step: stepType) => void;
}

function SignSection({ changeStep }: SignSectionProps) {
  const NFTValue = useAppSelector(selectNFTValue);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  const { confirm } = useAppSelector(selectModal);

  const listener = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", listener);
    setShowDialog(true);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  return (
    <>
      {(showPrompt || confirm) &&
        createPortal(
          <ConfirmModal
            changeStep={changeStep}
            confirmNavigation={confirmNavigation}
            cancelNavigation={cancelNavigation}
          />,
          el
        )}
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
      <section className={style.content}>
        <div className={style.sign_box_list}>
          <SignBoxList data={SIGN_DATAS} />
        </div>
        <div className={style.sell_info}>
          {/* <h2>Selected NFT</h2>
          <SelectedCard url={NFTValue.articleUrl} title={NFTValue.articleName} /> */}
          <SellInfoCard />
        </div>
      </section>
    </>
  );
}

export default SignSection;
