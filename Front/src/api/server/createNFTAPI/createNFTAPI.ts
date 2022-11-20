import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SELLY_API } from "@/constants/server";
import type { RootState } from "@/store";
import { SignedTransactionType } from "@/types/transaction.types";
import { CreateType } from "./createNFTAPI.types";
import { CardType } from "@/types/NFTData.types";
import { sendTransaction } from "@/api/blockchain";
import sleep from "@/helpers/utils/sleep";
import { closeLoading } from "@/store/modalSlice";
import { openAlert, setAlertContent, setAlertStyles, setIconStyles } from "@/store/alertSlice";

export const createNFTAPI = createApi({
  reducerPath: "createNFTAPI",
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
  tagTypes: ["create"],
  endpoints: (build) => ({
    //@ description: server에 Create NFT 정보를 보내는 API
    create: build.mutation<boolean, CreateType>({
      queryFn: async (body, { dispatch }, extraOptions, baseQuery) => {
        try {
          const { data } = await baseQuery({
            url: "selly-contract-service/minting",
            method: "POST",
            body,
          });
          await sendTransaction(data as SignedTransactionType);
          await sleep(2000);
          dispatch(closeLoading());
          return { data: true };
        } catch (error) {
          const { message } = error as Error;
          dispatch(closeLoading());
          if (message === "MetaMask Tx Signature: User denied transaction signature.") {
            dispatch(setAlertContent("서명이 거부되었습니다"));
            dispatch(setAlertStyles("error"));
            dispatch(setIconStyles(false));
            dispatch(openAlert());
            return { data: false };
          }

          dispatch(setAlertContent("에러가 발생했습니다. 다시 시도해주세요"));
          dispatch(setAlertStyles("error"));
          dispatch(setIconStyles(false));
          dispatch(openAlert());
          return { data: false };
        }
      },
      invalidatesTags: ["create"],
    }),

    //@ description: 프로필의 Ceated 탭의 데이터를 가져오는 API
    fetchCreatedData: build.query<CardType[], number>({
      query: (userId) => `selly-user-service/profile/user-created/${userId}/`,
      providesTags: ["create"],
    }),
  }),
});

export const { useCreateMutation, useFetchCreatedDataQuery } = createNFTAPI;
export default createNFTAPI;
