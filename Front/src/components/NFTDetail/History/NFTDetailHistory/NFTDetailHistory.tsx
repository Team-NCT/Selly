import { useState } from "react";
import style from "./NFTDetailHistory.module.scss";
import { NFTHistoryGraphBar } from "@/components/NFTDetail/History";
import { Neon } from "@/components/common";
import { calcNFTTransactionHistoryGraph } from "@/helpers/service/calcGraph";
import { useFetchNFTFractionHistoryQuery } from "@/api/server/NFTTransactionAPI";
import { NFTFractionHistoryType } from "@/types/NFTData.types";

const NFTDetailHistory = ({ articleId }: { articleId: number }) => {
  const [transactionHistory, setTransactionHistory] = useState<NFTFractionHistoryType>([]);
  const { data, isLoading, isSuccess } = useFetchNFTFractionHistoryQuery(articleId);
  const calcTransactionHistory = calcNFTTransactionHistoryGraph(data?.historyList);

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
