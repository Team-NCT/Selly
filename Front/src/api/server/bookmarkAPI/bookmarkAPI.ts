import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import type { RootState } from "@/store";
import {
  requestDataType,
  bookmarkResponseType,
  cancleBookmarkReponseType,
} from "./bookmarkAPI.types";

export const bookmarkAPI = createApi({
  reducerPath: "bookmarkAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_SERVICE_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["bookmark"],
  endpoints: (build) => ({
    //@ description: 유저가 게시글을 북마크 했는지 체크한다.
    checkBookmarkStatus: build.query<boolean, requestDataType>({
      query: ({ articleId, userId }) => `bookmark/${articleId}/${userId}`,
      providesTags: ["bookmark"],
    }),

    //@ description: 북마크
    bookmarkNFT: build.mutation<bookmarkResponseType, requestDataType>({
      query: (body) => ({
        url: "bookmark",
        method: "POST",
        body,
      }),
      invalidatesTags: ["bookmark"],
    }),

    //@ description: 북마크 해제
    cancleBookmarkNFT: build.mutation<cancleBookmarkReponseType, requestDataType>({
      query: (body) => ({
        url: "bookmark",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["bookmark"],
    }),
  }),
});

export const { useBookmarkNFTMutation, useCancleBookmarkNFTMutation, useCheckBookmarkStatusQuery } =
  bookmarkAPI;
export default bookmarkAPI;
