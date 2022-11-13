import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SELLY_API } from "@/constants/server";
import {
  NFTFractionRecordType,
  RequestDataType,
  SellNFTFractionType,
} from "./NFTTransactionAPI.types";
import { SignedTransactionType, PayableSignedTransactionType } from "@/types/transaction.types";
import type { RootState } from "@/store";

const NFTTransactionAPI = createApi({
  reducerPath: "NFTTransactionAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: SELLY_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["fraction", "sell", "auction"],
  endpoints: (build) => ({
    //@ description: NFT 구매를 위해 조각 거래 정보를 Fetch하는 API
    fetchNFTFractionRecord: build.query<NFTFractionRecordType[], number>({
      query: (articleId) => `selly-trade-service/trade-regist/${articleId}`,
      providesTags: ["fraction"],
    }),

    //@ description: 현재 특정 유저의 조각 거래 정보를 Fetch하는 API
    fetchUserNFTFraction: build.query<NFTFractionRecordType[], RequestDataType>({
      query: ({ articleId, userId }) => `selly-trade-service/trade-regist/${userId}/${articleId}`,
      providesTags: ["fraction"],
    }),

    //@ description: 특정 조각을 구매하는 API
    sellNFTFraction: build.mutation<PayableSignedTransactionType, SellNFTFractionType>({
      query: (body) => ({ url: "selly-contract-service/buy", method: "POST", body }),
      invalidatesTags: ["fraction"],
    }),
  }),
});

export const {
  useFetchNFTFractionRecordQuery,
  useFetchUserNFTFractionQuery,
  useSellNFTFractionMutation,
} = NFTTransactionAPI;
export default NFTTransactionAPI;
