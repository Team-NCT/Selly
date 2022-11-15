import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONTRACT_SERVICE_API } from "@/constants/server";
import { SignedTransactionType } from "@/types/transaction.types";
import { CreateType } from "./createNFTAPI.types";

export const createNFTAPI = createApi({
  reducerPath: "createNFTAPI",
  baseQuery: fetchBaseQuery({ baseUrl: CONTRACT_SERVICE_API }),
  tagTypes: ["create"],
  endpoints: (build) => ({
    //@ description: server에 Create NFT 정보를 보내는 API
    create: build.mutation<SignedTransactionType, CreateType>({
      query: (data) => ({
        url: "minting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["create"],
    }),
  }),
});

export const { useCreateMutation } = createNFTAPI;
export default createNFTAPI;
