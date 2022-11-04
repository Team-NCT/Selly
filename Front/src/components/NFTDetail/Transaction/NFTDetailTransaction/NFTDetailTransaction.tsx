import { useState } from "react";
import { tapType } from "./NFTDetailTransaction.types";
import style from "./NFTDetailTransaction.module.scss";
import { TransactionFractions, TransactionAuction } from "@/components/NFTDetail/Transaction";

const NFTDetailTransaction = () => {
  //* Tab 상태
  const [tab, setTab] = useState<tapType>("FRACTION");

  //* Tab 이동 버튼
  const handlerButtonClick = (tab: tapType) => {
    setTab(tab);
  };

  return (
    <section className={style.NFT_transction}>
      <section className={style[`NFT_transaction_select_${tab}`]}>
        <button className={style.fraction} onClick={() => handlerButtonClick("FRACTION")}>
          조각 구매 / 판매
        </button>
        <button className={style.auction} onClick={() => handlerButtonClick("AUCTION")}>
          경매 / 경매 등록
        </button>
      </section>
      {tab === "FRACTION" && <TransactionFractions />}
      {tab === "AUCTION" && <TransactionAuction />}
    </section>
  );
};

export default NFTDetailTransaction;
