import style from "./TransactionSellStatus.module.scss";
import { Modal, Spinner } from "@/components/common";
import { useAppDispatch } from "@/hooks";
import { closeSellStatus } from "@/store/modalSlice";
import { numberAddComma } from "@/helpers/utils/numberConversion";
import { useFetchUserNFTFractionQuery } from "@/api/server/NFTTransactionAPI/NFTTransactionAPI";
import { TransactionFractionsBuyProps } from "../TransactionFractionsBuy/TransactionFractionsBuy.types";

const TransactionSellStatus = ({ address, articleId, userId }: TransactionFractionsBuyProps) => {
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useFetchUserNFTFractionQuery({
    articleId,
    userId: userId ? userId : NaN,
  });

  const handleButtonClick = (saleContract: string) => {
    alert(saleContract);
  };

  if (isSuccess)
    return (
      <Modal close={() => dispatch(closeSellStatus())}>
        <section className={style.NFT_detail_sell_status}>
          <h1>조각 판매 현황</h1>
          {data.length > 0 ? (
            <ul>
              {data.map((item) => (
                <li key={item.saleContractAddress}>
                  <p>{numberAddComma(item.pieceCnt)} 개 </p>
                  <p>{item.tradePrice}ETH</p>
                  <button onClick={() => handleButtonClick(item.saleContractAddress)}>
                    판매 취소
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className={style.NFT_detail_sell_status_none}>
              <p>현재 등록된 거래가 없습니다</p>
              <p>(っ °Д °;)っ</p>
            </div>
          )}
        </section>
      </Modal>
    );

  return (
    <Modal close={() => dispatch(closeSellStatus())}>
      <Spinner />
    </Modal>
  );
};
export default TransactionSellStatus;
