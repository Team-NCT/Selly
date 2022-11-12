import { createPortal } from "react-dom";
import { useParams, Params } from "react-router-dom";
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
import { selectAccount } from "@/store/loginSlice";

import { args1, args2, args4 } from "./dummy";
import { useEffect } from "react";

const NFTDetail = () => {
  const { articleId } = useParams();
  const dispatch = useAppDispatch();
  const { buy, sell, sellStatus } = useAppSelector(selectModal);
  const { userId } = useAppSelector(selectAccount);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
      dispatch(closeBuy());
      dispatch(closeSell());
      dispatch(closeSellStatus());
    };
  }, [dispatch]);

  //TODO_JK: 404 페이지 구현 후 수정
  useEffect(() => {
    if (isNaN(Number(articleId))) {
      alert("404페이지로 이동");
    }
  }, [articleId]);

  return (
    <>
      <NFTDetailHeader {...args1} />
      <main className={style.NFT_detail}>
        <NFTDetailDescription {...args2} />
        <div>
          <NFTDetailTransaction articleId={Number(articleId)} userId={userId} />
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
