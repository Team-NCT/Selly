import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import style from "./NFTDetail.module.scss";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { selectModal, closeBuy, closeSell, closeSellStatus } from "@/store/modalSlice";
import { selectAccount } from "@/store/loginSlice";
import { useFetchNFTDataQuery } from "@/api/server/NFTDetailAPI";
import {
  NFTDetailHeader,
  NFTDetailDescription,
  NFTDetailHistory,
  NFTDetailTransaction,
  TransactionFractionsBuy,
  TransactionFractionsSell,
  TransactionSellStatus,
} from "@/components/NFTDetail";

const NFTDetail = () => {
  const { articleId } = useParams();
  const numberArticleId = articleId ? parseInt(articleId) : NaN;
  const dispatch = useAppDispatch();
  const { buy, sell, sellStatus } = useAppSelector(selectModal);
  const { userId, address } = useAppSelector(selectAccount);
  const { data, isError } = useFetchNFTDataQuery(numberArticleId);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  const args = {
    articleId: articleId ? parseInt(articleId) : NaN,
    address: address,
    userId: userId,
  };

  useEffect(() => {
    if (!userId) {
      dispatch(closeBuy());
      dispatch(closeSell());
      dispatch(closeSellStatus());
    }
    return () => {
      window.scrollTo(0, 0);
      dispatch(closeBuy());
      dispatch(closeSell());
      dispatch(closeSellStatus());
    };
  }, [dispatch, userId]);

  //TODO_JK: 404 페이지 구현 후 수정
  useEffect(() => {
    if (!articleId) alert("404페이지로 이동");
  }, [articleId]);

  return (
    articleId && (
      <>
        <NFTDetailHeader {...args1} />
        <main className={style.NFT_detail}>
          <NFTDetailDescription {...args2} />
          <div>
            <NFTDetailTransaction articleId={numberArticleId} userId={userId} />
            <NFTDetailHistory {...args4} />
          </div>
        </main>
        {buy && createPortal(<TransactionFractionsBuy {...args} />, el)}
        {sell && createPortal(<TransactionFractionsSell {...args} />, el)}
        {sellStatus && createPortal(<TransactionSellStatus {...args} />, el)}
      </>
    )
  );
};

export default NFTDetail;
