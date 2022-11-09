import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ARTICLE_SERVICE_API } from "@/constants/server";
import { NFTDetailDataType } from "./NFTDetailAPI.types";

const NFTDetailAPI = createApi({
  reducerPath: "NFTDetailAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ARTICLE_SERVICE_API }),
  tagTypes: ["NFTDetail"],
  endpoints: (build) => ({
    //@ description: NFT 상세 정보를 Fetch하는 API
    fetchNFTData: build.query<NFTDetailDataType, number>({
      query: (nftId) => `${nftId}`,
      providesTags: ["NFTDetail"],
    }),
  }),
});

export const { useFetchNFTDataQuery, useLazyFetchNFTDataQuery } = NFTDetailAPI;
export default NFTDetailAPI;
