import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SELLY_API } from "@/constants/server";
import type { RootState } from "@/store";
import {
  NFTFractionRecordType,
  RequestDataType,
  SellNFTFractionType,
  RegisterSellNFTFractionType,
  cancleSellNFTFractionType,
} from "./NFTTransactionAPI.types";
import { SignedTransactionType, PayableSignedTransactionType } from "@/types/transaction.types";
import { NFTFractionHistoryListType } from "@/types/NFTData.types";
import sleep from "@/helpers/utils/sleep";
import { sendTransaction, sendPayableTransaction } from "@/api/blockchain";
import {
  closeSellStatus,
  closeSell,
  closeBuy,
  closeLoading,
  openLoading,
} from "@/store/modalSlice";
import { openAlert, setAlertContent, setAlertStyles, setIconStyles } from "@/store/alertSlice";

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
  tagTypes: ["fraction", "sell", "buy", "auction", "cancle", "history"],
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

    //@ description: NFT 조각을 판매하기 위해 현재 보유 조각 개수를 Fetch하는 API
    fetchOwnedNFTCount: build.query<number, RequestDataType>({
      query: ({ articleId, userId }) =>
        `selly-user-service/nftPiece/${userId}?articleId=${articleId}`,
      providesTags: ["fraction"],
    }),

    //@ description: NFT 조각 거래 history를 Fetch하는 API
    fetchNFTFractionHistory: build.query<NFTFractionHistoryListType, number>({
      query: (articleId) => `selly-trade-service/nft-trade-history/${articleId}`,
      providesTags: ["history"],
    }),

    //@ description: 특정 조각을 구매하는 API
    buyNFTFraction: build.mutation<boolean, SellNFTFractionType>({
      queryFn: async (body, { dispatch }, extraOptions, baseQuery) => {
        try {
          const { data } = await baseQuery({
            url: "selly-contract-service/buy",
            method: "POST",
            body,
          });
          dispatch(openLoading());
          await sendPayableTransaction(data as PayableSignedTransactionType);
          dispatch(closeLoading());
          dispatch(closeBuy());
          await sleep(2000);
          return { data: true };
        } catch (error) {
          dispatch(closeLoading());
          dispatch(openAlert());
          dispatch(setAlertContent("거래가 중단되었습니다"));
          dispatch(setAlertStyles("error"));
          dispatch(setIconStyles(false));
          return { data: false };
        }
      },
      invalidatesTags: ["buy", "fraction", "history"],
    }),

    //@ description: 특정 조각을 판매등록하는 API
    registerSellNFTFraction: build.mutation<boolean, RegisterSellNFTFractionType>({
      queryFn: async (body, { dispatch }, extraOptions, baseQuery) => {
        try {
          const { data } = await baseQuery({
            url: "selly-contract-service/sellregist",
            method: "POST",
            body,
          });
          dispatch(openLoading());
          await sendTransaction(data as SignedTransactionType);
          dispatch(closeLoading());
          dispatch(closeSell());
          await sleep(2000);
          return { data: true };
        } catch (error) {
          dispatch(closeLoading());
          dispatch(openAlert());
          dispatch(setAlertContent("거래가 중단되었습니다"));
          dispatch(setAlertStyles("error"));
          dispatch(setIconStyles(false));
          return { data: false };
        }
      },
      invalidatesTags: ["sell", "fraction"],
    }),

    //@ description: 조각을 판매 취소하는 API
    cancleSellNFTFraction: build.mutation<boolean, cancleSellNFTFractionType>({
      queryFn: async (body, { dispatch }, extraOptions, baseQuery) => {
        try {
          const { data } = await baseQuery({
            url: "selly-contract-service/cancelSale",
            method: "POST",
            body,
          });
          dispatch(openLoading());
          await sendTransaction(data as SignedTransactionType);
          dispatch(closeLoading());
          dispatch(closeSellStatus());
          await sleep(2000);
          return { data: true };
        } catch (error) {
          dispatch(closeLoading());
          dispatch(openAlert());
          dispatch(setAlertContent("거래가 중단되었습니다"));
          dispatch(setAlertStyles("error"));
          dispatch(setIconStyles(false));
          return { data: false };
        }
      },
      invalidatesTags: ["cancle", "fraction"],
    }),
  }),
});

export const {
  useFetchNFTFractionRecordQuery,
  useLazyFetchNFTFractionRecordQuery,
  useFetchUserNFTFractionQuery,
  useLazyFetchOwnedNFTCountQuery,
  useFetchOwnedNFTCountQuery,
  useLazyFetchUserNFTFractionQuery,
  useFetchNFTFractionHistoryQuery,
  useBuyNFTFractionMutation,
  useRegisterSellNFTFractionMutation,
  useCancleSellNFTFractionMutation,
} = NFTTransactionAPI;
export default NFTTransactionAPI;
