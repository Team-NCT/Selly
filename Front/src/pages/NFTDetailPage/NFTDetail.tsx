import { createPortal } from "react-dom";
import style from "./NFTDetail.module.scss";
import {
  NFTDetailHeader,
  NFTDetailDescription,
  NFTDetailHistory,
  NFTDetailTransaction,
  TransactionFractionsBuy,
  TransactionFractionsSell,
  TransactionSellStatus,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { selectModal } from "@/store/modalSlice";

import { args1, args2, args3, args4 } from "./dummy";

const NFTDetail = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  const { buy, sell, sellStatus } = useAppSelector(selectModal);
  return (
    <>
      <NFTDetailHeader {...args1} />
      <main className={style.NFT_detail}>
        <NFTDetailDescription {...args2} />
        <div>
          <NFTDetailTransaction {...args3} />
          <NFTDetailHistory {...args4} />
        </div>
      </main>
      {buy && createPortal(<TransactionFractionsBuy />, el)}
      {sell && createPortal(<TransactionFractionsSell />, el)}
      {sellStatus && createPortal(<TransactionSellStatus />, el)}
    </>
  );
};

export default NFTDetail;
