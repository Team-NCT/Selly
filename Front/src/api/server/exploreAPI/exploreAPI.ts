import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ARTICLE_SERVICE_API } from "@/constants/server";
import { CategoryType } from "./exploreAPI.types";
import { NFTDescCardDataType } from "@/types/NFTData.types";

const exploreAPI = createApi({
  reducerPath: "exploreAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${ARTICLE_SERVICE_API}category-filter` }),
  tagTypes: ["explore"],
  endpoints: (build) => ({
    //@ description: 카테고리별 NFT 목록을 Fetch하는 API
    fetchNFTList: build.query<NFTDescCardDataType[], CategoryType>({
      query: (category) => `/${category}`,
      providesTags: ["explore"],
    }),
  }),
});

export const { useFetchNFTListQuery, useLazyFetchNFTListQuery } = exploreAPI;
export default exploreAPI;
