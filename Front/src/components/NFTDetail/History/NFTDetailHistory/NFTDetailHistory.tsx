import style from "./NFTDetailHistory.module.scss";
import { NFTDetailHistoryProps } from "./NFTDetailHistory.types";
import { NFTHistoryGraphBar } from "@/components/NFTDetail/History";
import { Neon } from "@/components/common";
import { calcNFTTransactionHistoryGraph } from "@/helpers/service/calcGraph";

const NFTDetailHistory = ({ transactionHistory, totalAverage }: NFTDetailHistoryProps) => {
  const calcTransactionHistory = calcNFTTransactionHistoryGraph(transactionHistory);

  return (
    <section className={style.NFT_detail_history}>
      <section className={style.NFT_detail_history_title}>
        <h1>판매 히스토리</h1>
        <div>
          <Neon color="sherbet100" positionH="bottom" positionW="right">
            <h2>평균 거래가</h2>
          </Neon>
          <p>{totalAverage} ETH</p>
        </div>
      </section>
      <ul className={style.NFT_detail_history_graph}>
        {calcTransactionHistory.map((item, index) => (
          <NFTHistoryGraphBar {...item} key={index} />
        ))}
        <hr />
      </ul>
    </section>
  );
};

export default NFTDetailHistory;