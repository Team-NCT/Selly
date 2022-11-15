import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import { UserProfileType } from "@/types/user.type";
import {
  fetchUserProfileParamsData,
  followDataType,
  cardType,
  DescCardType,
} from "./userAPI.types";
import type { RootState } from "@/store";

const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_SERVICE_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account.token;
      const userId = (getState() as RootState).account.userId;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("userId", userId);
      }

      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (build) => ({
    //@ description: 프로필에 들어갔을 때 유저의 정보를 fetch하는 API
    fetchUserProfile: build.query<UserProfileType, fetchUserProfileParamsData>({
      query: (param) => `users/${param.profileId}/${param.userId}`,
      providesTags: ["user"],
    }),
    //@ description: 유저를 팔로우하는 API
    follow: build.mutation<followDataType, followDataType>({
      query: (data) => ({
        url: `/follow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    //@ description: 유저를 언팔로우하는 API
    unFollow: build.mutation<followDataType, followDataType>({
      query: (data) => ({
        url: `/follow`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    //@ description: Ceated 탭의 데이터를 가져오는 API
    fetchCreatedData: build.query<cardType[], number>({
      query: (userId) => `/profile/user-created/${userId}/`,
      providesTags: ["user"],
    }),
    //@ description: ForSale 탭의 데이터를 가져오는 API
    fetchForSaleData: build.query<cardType, number>({
      query: (userId) => `/profile/user-forSale/${userId}/`,
      providesTags: ["user"],
    }),
    //@ description: Fractions 탭의 데이터를 가져오는 API
    fetchFractionsData: build.query<DescCardType, number>({
      query: (userId) => `/profile/user-fractions/${userId}/`,
      providesTags: ["user"],
    }),
  }),
});

export const {
  useFetchUserProfileQuery,
  useFollowMutation,
  useUnFollowMutation,
  useFetchCreatedDataQuery,
  useFetchForSaleDataQuery,
  useFetchFractionsDataQuery,
} = userAPI;
export default userAPI;
