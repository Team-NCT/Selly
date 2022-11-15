import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ARTICLE_SERVICE_API } from "@/constants/server";
import { NFTCardDataType } from "@/types/NFTData.types";

export const rankingAPI = createApi({
  reducerPath: "rankingAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ARTICLE_SERVICE_API }),
  tagTypes: ["NFTRanking"],
  endpoints: (build) => ({
    //@ description: NFT 랭킹 정보를 Fetch하는 API
    fetchNFTRanking: build.query<NFTCardDataType[], void>({
      query: () => "articleRanking",
      providesTags: ["NFTRanking"],
    }),
  }),
});

export const { useFetchNFTRankingQuery } = rankingAPI;

export default rankingAPI;
