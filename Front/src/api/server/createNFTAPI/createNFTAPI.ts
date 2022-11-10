import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONTRACT_SERVICE_API } from "@/constants/server";
import { CreateType, DataType } from "./createNFTAPI.types";

import Web3 from "web3";
const web3 = new Web3(window.ethereum);

export const createNFTAPI = createApi({
  reducerPath: "createNFTAPI",
  baseQuery: fetchBaseQuery({ baseUrl: CONTRACT_SERVICE_API }),
  tagTypes: ["create"],
  endpoints: (build) => ({
    //@ description: server에 Create NFT 정보를 보내는 API
    create: build.mutation<DataType, CreateType>({
      query: (data) => ({
        url: "minting",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["create"],

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const newData = {
            nonce: data.nonce,
            to: data.to,
            from: data.from,
            data: data.data,
          };
          console.log(newData);
          web3.eth.sendTransaction(newData).catch((err) => {
            console.log(err);
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useCreateMutation } = createNFTAPI;
export default createNFTAPI;
