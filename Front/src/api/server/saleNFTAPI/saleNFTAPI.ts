import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONTRACT_SERVICE_API } from "@/constants/server";
import { SignedTransactionType } from "@/types/transaction.types";
import { F_NFTSaleType } from "./saleNFTAPI.types";

export const SaleNFTAPI = createApi({
  reducerPath: "SaleNFTAPI",
  baseQuery: fetchBaseQuery({ baseUrl: CONTRACT_SERVICE_API }),
  tagTypes: ["F_NFTSale"],
  endpoints: (build) => ({
    //@ description: server에 NFT를 분할해서 판매하는 NFT의 정보를 보내는 API
    saleNFT: build.mutation<SignedTransactionType, F_NFTSaleType>({
      query: (data) => ({
        url: "sellregist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["F_NFTSale"],
    }),
  }),
});

export const { useSaleNFTMutation } = SaleNFTAPI;
export default SaleNFTAPI;
