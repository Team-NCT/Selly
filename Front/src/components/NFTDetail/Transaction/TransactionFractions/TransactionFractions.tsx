import style from "./TransactionFractions.module.scss";
import { Button } from "@/components/common";
import { useAppDispatch } from "@/hooks";
import { openBuy, openSell, openSellStatus } from "@/store/modalSlice";
import { setFractionSaleData } from "@/store/fractionSlice";
import { numberAddComma } from "@/helpers/utils/numberConversion";
import { NFTDetailTransactionProps } from "../";

const TransactionFractions = ({ articleId, userId }: NFTDetailTransactionProps) => {
  const dispatch = useAppDispatch();

  //TODO_JK API 연결
  const data = [
    { count: 10000, price: 0.0025, saleContract: "123" },
    { count: 10, price: 0.0025, saleContract: "234" },
    { count: 10, price: 0.0025, saleContract: "1234" },
    { count: 10, price: 0.0025, saleContract: "435345" },
    { count: 10, price: 0.0025, saleContract: "234234" },
    { count: 10, price: 0.0025, saleContract: "124523453" },
    { count: 1, price: 0.0025, saleContract: "1234523423" },
  ];

  //* 조각 구매 모달에 조각 정보를 전달하기 위해 store에 관련 데이터를 저장한다.
  const openBuyModal = (item: { count: number; price: number; saleContract: string }) => {
    dispatch(setFractionSaleData(item));
    dispatch(openBuy());
  };

  return (
    <section className={style.NFT_detail_transction_fractions}>
      <ul>
        {data.map((item) => (
          <li key={item.saleContract}>
            <p>{numberAddComma(item.count)} 개 </p>
            <p>{item.price}ETH</p>
            <button onClick={() => openBuyModal(item)}>구매 하기</button>
          </li>
        ))}
      </ul>
      <div>
        <Button
          bg="blackberry"
          color="outline"
          size="fillContainer"
          onClick={() => dispatch(openSell())}>
          조각 판매하기
        </Button>
        <Button size="fillContainer" onClick={() => dispatch(openSellStatus())}>
          판매 현황
        </Button>
      </div>
    </section>
  );
};

export default TransactionFractions;
