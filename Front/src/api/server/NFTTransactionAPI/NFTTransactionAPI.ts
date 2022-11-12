import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRADE_SERVICE_API } from "@/constants/server";
import { NFTFractionRecordType, RequestDataType } from "./NFTTransactionAPI.types";
import { SignedTransactionType } from "@/types/transaction.types";
import type { RootState } from "@/store";

const NFTTransactionAPI = createApi({
  reducerPath: "NFTTransactionAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: TRADE_SERVICE_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["fraction", "auction"],
  endpoints: (build) => ({
    //@ description: NFT 구매를 위해 조각 거래 정보를 Fetch하는 API
    fetchNFTFractionRecord: build.query<NFTFractionRecordType[], number>({
      query: (articleId) => `trade-regist/${articleId}`,
      providesTags: ["fraction"],
    }),

    //@ description: 현재 특정 유저의 조각 거래 정보를 Fetch하는 API
    fetchUserNFTFraction: build.query<NFTFractionRecordType[], RequestDataType>({
      query: ({ articleId, userId }) => `trade-regist/${userId}/${articleId}`,
      providesTags: ["fraction"],
    }),

    //@ description: 특정 조각을 구매하는 API
    //TODO_JK: API 나오면 수정
    sellNFTFraction: build.mutation<SignedTransactionType>({
      query: (body) => ({ url: "trade", method: "POST", body }),
      invalidatesTags: ["fraction"],
    }),
  }),
});

export const { useFetchNFTFractionRecordQuery, useFetchUserNFTFractionQuery } = NFTTransactionAPI;
export default NFTTransactionAPI;
