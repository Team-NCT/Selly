import style from "./NFTDetailHistory.module.scss";
import { NFTHistoryGraphBar } from "@/components/NFTDetail/History";
import { Neon } from "@/components/common";
import { calcNFTTransactionHistoryGraph } from "@/helpers/service/calcGraph";

const transactionHistory = [
  { date: "2022-10-31 14:51:24.585196", average: 0.0025, lowest: 0.0025, highest: 0.0025 },
  { date: "2022-10-30 14:51:24.585196", average: 0.001, lowest: 0.0025, highest: 0.0025 },
  { date: "2022-10-29 14:51:24.585196", average: 0.003, lowest: 0.0025, highest: 0.0025 },
  { date: "2022-10-28 14:51:24.585196", average: 0.0005, lowest: 0.0025, highest: 0.0025 },
  { date: "2022-10-27 14:51:24.585196", average: 0.005, lowest: 0.0025, highest: 0.0025 },
];
const totalAverage = 0.0025;

const NFTDetailHistory = () => {
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
