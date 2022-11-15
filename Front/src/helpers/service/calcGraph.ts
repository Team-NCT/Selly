//* 그래프 관련 계산 함수
import { NFTFractionHistoryType } from "@/types/NFTData.types";

export interface calcNFTDetailHistoryType extends NFTFractionHistoryType {
  height: number;
}

/**
 *
 * @ description: NFT 거래 히스토리 바 그래프의 높이를 계산하는 함수입니다.
 * @ param: 전체 기간의 평균 값, 히스토리 리스트
 * @ returns: 그래프 높이가 추가된 히스토리 리스트
 */
export const calcNFTTransactionHistoryGraph = (
  historyList: NFTFractionHistoryType[]
): calcNFTDetailHistoryType[] => {
  //* 바 그래프의 최대 값
  let maxValue = 0;

  for (const history of historyList) {
    if (history.avgPrice <= maxValue) {
      continue;
    }
    maxValue = history.avgPrice;
  }

  const graphList = historyList.map((item) => {
    const height = (item.avgPrice / maxValue) * 100;
    return { height, ...item };
  });

  return graphList;
};
