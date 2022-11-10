import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONTRACT_SERVICE_API } from "@/constants/server";
import { DataType } from "./createNFTAPI.types";

export const createNFTAPI = createApi({
  reducerPath: "createNFTAPI",
  baseQuery: fetchBaseQuery({ baseUrl: CONTRACT_SERVICE_API }),
  tagTypes: ["create"],
  endpoints: (build) => ({
    //@ description: server에 Create NFT 정보를 보내는 API
    create: build.mutation<DataType, string>({
      query: (data) => ({
        url: "minting",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response: { data: any }) => {
        console.log(response.data);
        return response.data;
      },
      invalidatesTags: ["create"],

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useCreateMutation } = createNFTAPI;
export default createNFTAPI;
