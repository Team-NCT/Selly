import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import style from "./NFTDetail.module.scss";
import { MetaDataType, initialMetaData } from "@/types/metaData.types";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  selectModal,
  closeBuy,
  closeSell,
  closeSellStatus,
  closeLoading,
} from "@/store/modalSlice";
import { selectAccount } from "@/store/loginSlice";
import { useFetchNFTDataQuery } from "@/api/server/NFTDetailAPI";
import { getNFTData } from "@/api/blockchain";
import { LoadingModal, Spinner } from "@/components/common";
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
  const navigate = useNavigate();
  const [metaData, setMetaData] = useState<MetaDataType>(initialMetaData);
  const numberArticleId = articleId ? parseInt(articleId) : NaN;
  const dispatch = useAppDispatch();
  const { buy, sell, sellStatus, loading } = useAppSelector(selectModal);
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
      dispatch(closeLoading());
    };
  }, [dispatch, userId]);

  useEffect(() => {
    if (!isError) return;
    navigate("/404");
  }, [isError, navigate]);

  //* 메타 데이터 fetch
  useEffect(() => {
    if (!data) return;
    if (!data.article.metaDataUrl) return;
    (async () => {
      const response = await getNFTData(data.article.metaDataUrl);
      setMetaData(response);
    })();
  }, [data]);

  if (isSuccess)
    return (
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
            primaryCnt={data.article.primaryCnt}
          />
          <div>
            <NFTDetailTransaction articleId={numberArticleId} userId={userId} />
            <NFTDetailHistory articleId={numberArticleId} />
          </div>
        </main>

        {/* 구매 모달 */}
        {buy && createPortal(<TransactionFractionsBuy {...args} />, el)}

        {/* 조각 판매 등록 모달 */}
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

        {/* 판매 현황 모달 */}
        {sellStatus && createPortal(<TransactionSellStatus {...args} />, el)}

        {/* 로딩 모달 */}
        {loading && createPortal(<LoadingModal />, el)}
      </>
    );

  return (
    <main className={style.NFT_detail_error}>
      <Spinner />
    </main>
  );
};

export default NFTDetail;
