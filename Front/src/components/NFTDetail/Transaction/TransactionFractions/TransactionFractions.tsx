import style from "./TransactionFractions.module.scss";
import { Button } from "@/components/common";
import { useAppDispatch } from "@/hooks";
import { openBuy, openSell, openSellStatus } from "@/store/modalSlice";
import { numberAddComma } from "@/helpers/utils/numberConversion";

const TransactionFractions = () => {
  const dispatch = useAppDispatch();

  //TODO_JK API 연결
  const data = [
    { count: 10000, price: 0.0025, saleContract: "123" },
    { count: 10, price: 0.0025, saleContract: "123" },
    { count: 10, price: 0.0025, saleContract: "123" },
    { count: 10, price: 0.0025, saleContract: "123" },
    { count: 10, price: 0.0025, saleContract: "123" },
    { count: 10, price: 0.0025, saleContract: "123" },
    { count: 1, price: 0.0025, saleContract: "123" },
  ];

  return (
    <section className={style.NFT_detail_transction_fractions}>
      <ul>
        {data.map((item) => (
          <li key={item.saleContract}>
            <p>{numberAddComma(item.count)} 개 </p>
            <p>{item.price}ETH</p>
            <button onClick={() => dispatch(openBuy())}>구매 하기</button>
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
