import style from "./TransactionFractions.module.scss";
import { Button, Spinner } from "@/components/common";
import { useAppDispatch } from "@/hooks";
import { openBuy, openSell, openSellStatus } from "@/store/modalSlice";
import { setFractionSaleData } from "@/store/fractionSlice";
import { numberAddComma } from "@/helpers/utils/numberConversion";
import { NFTDetailTransactionProps } from "../";
import { useFetchNFTFractionRecordQuery } from "@/api/server/NFTTransactionAPI";
import { NFTFractionRecordType } from "@/api/server/NFTTransactionAPI";

const TransactionFractions = ({ articleId, userId }: NFTDetailTransactionProps) => {
  const dispatch = useAppDispatch();
  const { isSuccess, data, isError } = useFetchNFTFractionRecordQuery(articleId);

  //* 조각 구매 모달에 조각 정보를 전달하기 위해 store에 관련 데이터를 저장한다.
  const openBuyModal = (item: NFTFractionRecordType) => {
    if (!userId) {
      return alert("로그인 하세요 ^^");
    }
    const data = {
      sellerId: item.seller,
      pieceCnt: item.pieceCnt,
      tradePrice: item.tradePrice,
      saleContractAddress: item.saleContractAddress,
    };
    dispatch(setFractionSaleData(data));
    dispatch(openBuy());
  };

  //* 판매 모달
  const openSellModal = () => {
    if (!userId) {
      return alert("로그인 하세요 ^^");
    }
    dispatch(openSell());
  };

  //* 판매 현황 모달
  const openSellStatusModal = () => {
    if (!userId) {
      return alert("로그인 하세요 ^^");
    }
    dispatch(openSellStatus());
  };

  //* 에러
  if (isError)
    return (
      <section className={style.NFT_detail_transction_fractions}>
        <p className={style.NFT_detail_trasaction_fractions_error}>에러가 발생했습니다 </p>
        <p className={style.NFT_detail_trasaction_fractions_error_2}> (っ °Д °;)っ </p>
      </section>
    );

  //* 성공
  if (isSuccess)
    return (
      <section className={style.NFT_detail_transction_fractions}>
        {data.length > 0 ? (
          <ul>
            {data.map((item) => (
              <li key={item.saleContractAddress}>
                <p>{numberAddComma(item.pieceCnt)} 개 </p>
                <p>{item.tradePrice}ETH</p>
                <button onClick={() => openBuyModal(item)}>구매 하기</button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={style.NFT_detail_transction_fractions_none}>
            <p>현재 등록된 거래가 없습니다</p>
            <p>(っ °Д °;)っ</p>
          </div>
        )}
        <div className={style.NFT_detail_transactions_button}>
          <Button bg="blackberry" color="outline" size="fillContainer" onClick={openSellModal}>
            조각 판매하기
          </Button>
          <Button size="fillContainer" onClick={openSellStatusModal}>
            판매 현황
          </Button>
        </div>
      </section>
    );

  // 로딩 중
  return (
    <section className={style.NFT_detail_transction_fractions}>
      <Spinner />
    </section>
  );
};

export default TransactionFractions;
