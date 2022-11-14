import {
  useLazyFetchNFTFractionRecordQuery,
  useLazyFetchOwnedNFTCountQuery,
  useLazyFetchUserNFTFractionQuery,
} from "@/api/server/NFTTransactionAPI";

const useRefetchTransactionData = (articleId: number, userId: number) => {
  const [fetchNFTFractionRecord] = useLazyFetchNFTFractionRecordQuery();
  const [fetchOwnedNFTCount] = useLazyFetchOwnedNFTCountQuery();
  const [fetchUserNFTFraction] = useLazyFetchUserNFTFractionQuery();

  const refetchNFTFractionData = () => {
    fetchNFTFractionRecord(articleId);
    fetchOwnedNFTCount({ articleId, userId });
    fetchUserNFTFraction({ articleId, userId });
  };

  return { refetchNFTFractionData };
};

export default useRefetchTransactionData;
