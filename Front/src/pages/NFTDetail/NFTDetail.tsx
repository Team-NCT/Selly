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
} from "@/components/NFTDetail";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { selectModal, closeBuy, closeSell, closeSellStatus } from "@/store/modalSlice";

import { args1, args2, args3, args4 } from "./dummy";
import { useEffect } from "react";

const NFTDetail = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  const { buy, sell, sellStatus } = useAppSelector(selectModal);

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
      dispatch(closeBuy());
      dispatch(closeSell());
      dispatch(closeSellStatus());
    };
  }, [dispatch]);
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
