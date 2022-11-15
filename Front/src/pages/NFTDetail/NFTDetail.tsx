import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import style from "./NFTDetail.module.scss";
import { MetaDataType, initialMetaData } from "@/types/metaData.types";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { selectModal, closeBuy, closeSell, closeSellStatus } from "@/store/modalSlice";
import { selectAccount } from "@/store/loginSlice";
import { useFetchNFTDataQuery } from "@/api/server/NFTDetailAPI";
import { getNFTData } from "@/api/blockchain";
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
  const [metaData, setMetaData] = useState<MetaDataType>(initialMetaData);
  const numberArticleId = articleId ? parseInt(articleId) : NaN;
  const dispatch = useAppDispatch();
  const { buy, sell, sellStatus } = useAppSelector(selectModal);
  const { userId, address } = useAppSelector(selectAccount);
  const { data, isError, isSuccess } = useFetchNFTDataQuery(numberArticleId);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  const args = {
    articleId: numberArticleId,
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
    if (!isError) return;
    alert("404페이지로 이동");
  }, [isError]);

  useEffect(() => {
    if (!data) return;
    if (!data.article.metaDataUrl) return;
    console.log(data);
    (async () => {
      const response = await getNFTData(data.article.metaDataUrl);
      setMetaData(response);
    })();
  }, [data]);

  return (
    isSuccess && (
      <>
        <NFTDetailHeader
          id={numberArticleId}
          userId={userId}
          imageUrl={data.article.articleImgUrl}
          title={metaData.name}
          url={metaData.external_url}
        />
        <main className={style.NFT_detail}>
          <NFTDetailDescription
            user={data.user}
            contractAddress={data.article.contractAddress}
            tokenId={data.article.tokenId}
            metaData={metaData}
          />
          <div>
            <NFTDetailTransaction articleId={numberArticleId} userId={userId} />
            <NFTDetailHistory />
          </div>
        </main>
        {buy && createPortal(<TransactionFractionsBuy {...args} />, el)}
        {sell &&
          createPortal(
            <TransactionFractionsSell
              contractAddress={data.article.contractAddress}
              ownershipContractAddress={data.article.ownershipContractAddress}
              tokenId={data.article.tokenId}
              {...args}
            />,
            el
          )}
        {sellStatus && createPortal(<TransactionSellStatus {...args} />, el)}
      </>
    )
  );
};

export default NFTDetail;
