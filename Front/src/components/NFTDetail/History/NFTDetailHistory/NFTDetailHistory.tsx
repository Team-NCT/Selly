import style from "./NFTDetailHistory.module.scss";
import { NFTDetailHistoryProps } from "./NFTDetailHistory.types";
import { NFTHistoryGraphBar } from "@/components/NFTDetail/History";
import { Neon } from "@/components/common";

const NFTDetailHistory = ({ transactionHistory, totalAverage }: NFTDetailHistoryProps) => {
  const handleMouseOver = (index: number) => {
    alert(index);
  };
  return (
    <section className={style.NFT_detail_history}>
      <div className={style.NFT_detail_history_title}>
        <h1>판매 히스토리</h1>
        <div>
          <Neon color="sherbet100" positionH="bottom" positionW="right">
            <h2>평균 거래가</h2>
          </Neon>
          <p>{totalAverage} ETH</p>
        </div>
      </div>
      <div className={style.NFT_detail_history_graph}>
        {transactionHistory.map((item, index) => (
          <NFTHistoryGraphBar
            height={10}
            key={index}
            handleMouseOver={() => handleMouseOver(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default NFTDetailHistory;
