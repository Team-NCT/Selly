import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SEARCH_SERVICE_API } from "@/constants/server";
import { SearchResultType } from "@/types/search.type";

const searchAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SEARCH_SERVICE_API }),
  tagTypes: ["search"],
  endpoints: (build) => ({
    //@ description: NFT 키워드 검색 결과를 fetch 하는 API
    fetchSearchResult: build.query<SearchResultType, string>({
      query: (keyword) => `search/${keyword}`,
      providesTags: ["search"],
    }),
  }),
});

export const { useFetchSearchResultQuery, useLazyFetchSearchResultQuery } = searchAPI;
export default searchAPI;
