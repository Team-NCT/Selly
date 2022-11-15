import { useState, useEffect } from "react";
import style from "./NFTDetailHistory.module.scss";
import { NFTHistoryGraphBar } from "@/components/NFTDetail/History";
import { Neon } from "@/components/common";
import {
  calcNFTTransactionHistoryGraph,
  calcNFTDetailHistoryType,
} from "@/helpers/service/calcGraph";
import { useFetchNFTFractionHistoryQuery } from "@/api/server/NFTTransactionAPI";
import { NFTFractionHistoryType } from "@/types/NFTData.types";

const NFTDetailHistory = ({ articleId }: { articleId: number }) => {
  const [transactionHistory, setTransactionHistory] = useState<NFTFractionHistoryType[]>([]);
  const [calcTransactionHistory, setCalcTransactionHistory] = useState<calcNFTDetailHistoryType[]>(
    []
  );
  const { data, isSuccess } = useFetchNFTFractionHistoryQuery(articleId);

  useEffect(() => {
    if (!isSuccess) return;
    setTransactionHistory(data.historyList);
  }, [isSuccess, data]);

  useEffect(() => {
    if (!(transactionHistory.length > 0)) return;
    const data = calcNFTTransactionHistoryGraph(transactionHistory);
    setCalcTransactionHistory(data);
  }, [transactionHistory]);

  return (
    <section className={style.NFT_detail_history}>
      <section className={style.NFT_detail_history_title}>
        <h1>판매 히스토리</h1>
        <div>
          <Neon color="sherbet100" positionH="bottom" positionW="right">
            <h2>평균 거래가</h2>
          </Neon>
          <p>{data?.avgPrice} ETH</p>
        </div>
      </section>
      {calcTransactionHistory.length > 0 ? (
        <ul className={style.NFT_detail_history_graph}>
          {calcTransactionHistory.map((item, index) => (
            <NFTHistoryGraphBar {...item} key={index} />
          ))}
          <hr />
        </ul>
      ) : (
        <div className={style.NFT_detail_history_none}>
          <p>진행된 거래 기록이 없습니다</p>
          <p>(っ °Д °;)っ</p>
        </div>
      )}
    </section>
  );
};

export default NFTDetailHistory;
