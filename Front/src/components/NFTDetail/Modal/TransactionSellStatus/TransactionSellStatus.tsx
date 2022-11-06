import style from "./TransactionSellStatus.module.scss";
import { Modal } from "@/components/common";
import { useAppDispatch } from "@/hooks";
import { closeSellStatus } from "@/store/modalSlice";
import { numberAddComma } from "@/helpers/utils/numberConversion";

const TransactionSellStatus = () => {
  const dispatch = useAppDispatch();

  //TODO_JK: API 연결 후 데이터 받기
  const data = [
    { count: 10000, price: 0.0025, saleContract: "123" },
    { count: 10, price: 0.0025, saleContract: "234" },
    { count: 10, price: 0.0025, saleContract: "1234" },
    { count: 10, price: 0.0025, saleContract: "435345" },
    { count: 10, price: 0.0025, saleContract: "234234" },
    { count: 10, price: 0.0025, saleContract: "124523453" },
    { count: 1, price: 0.0025, saleContract: "1234523423" },
  ];

  const handleButtonClick = (saleContract: string) => {
    alert(saleContract);
  };

  return (
    <Modal close={() => dispatch(closeSellStatus())}>
      <section className={style.NFT_detail_sell_status}>
        <h1>조각 판매 현황</h1>
        <ul>
          {data.map((item) => (
            <li key={item.saleContract}>
              <p>{numberAddComma(item.count)} 개 </p>
              <p>{item.price}ETH</p>
              <button onClick={() => handleButtonClick(item.saleContract)}>판매 취소</button>
            </li>
          ))}
        </ul>
      </section>
    </Modal>
  );
};
export default TransactionSellStatus;
