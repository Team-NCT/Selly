// codeblock-meta title="Basic queryFn example"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONTRACT_SERVICE_API } from "@/constants/server";
import { SignedTransactionType } from "@/types/transaction.types";
import { F_NFTSaleType } from "./saleNFTAPI.types";
import { openLoading, closeLoading } from "@/store/modalSlice";
import { sendTransaction } from "@/api/blockchain";
import { openAlert, setAlertContent, setAlertStyles, setIconStyles } from "@/store/alertSlice";

export const SaleNFTAPI = createApi({
  reducerPath: "SaleNFTAPI",
  baseQuery: fetchBaseQuery({ baseUrl: CONTRACT_SERVICE_API }),
  tagTypes: ["F_NFTSale"],
  endpoints: (build) => ({
    //@ description: server에 NFT를 분할해서 판매하는 NFT의 정보를 보내는 API
    saleNFT: build.mutation<SignedTransactionType, F_NFTSaleType>({
      query: (body) => ({
        url: "sellregist",
        method: "POST",
        body: body,
      }),
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        try {
          dispatch(openLoading());
          const { data } = await queryFulfilled;
          const response = await sendTransaction(data);
          console.log(response);
          dispatch(closeLoading());
        } catch (error) {
          console.error(error);
          dispatch(closeLoading());
          dispatch(openAlert());
          dispatch(setAlertContent("거래가 중단되었습니다"));
          dispatch(setAlertStyles("error"));
          dispatch(setIconStyles(false));
        }
      },
      invalidatesTags: ["F_NFTSale"],
    }),
  }),
});

export const { useSaleNFTMutation } = SaleNFTAPI;
export default SaleNFTAPI;
