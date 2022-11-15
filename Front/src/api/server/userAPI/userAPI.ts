import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import { UserProfileType, UserFollowType } from "@/types/user.type";
import {
  fetchUserProfileParamsData,
  followDataType,
  cardType,
  DescCardType,
  RevenueType,
  SettingsType,
  FetchSettingsType,
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
        headers.set("userId", String(userId));
        headers.set("Content-type", "application/json; charset=utf-8");
      }

      return headers;
    },
  }),
  tagTypes: ["user", "profile", "settings"],
  endpoints: (build) => ({
    //@ description: 프로필에 들어갔을 때 유저의 정보를 fetch하는 API
    fetchUserProfile: build.query<UserProfileType, fetchUserProfileParamsData>({
      query: (param) => `users/${param.profileId}/${param.userId}`,
      providesTags: ["user", "settings"],
    }),
    //@ description: 유저 프로필을 업데이트 하는 API
    fetchSettings: build.mutation<SettingsType, FetchSettingsType>({
      query: (params) => ({
        url: `users/${params.userId}`,
        method: "PUT",
        body: params.data,
      }),
      invalidatesTags: ["settings"],
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
    //@ description: 유저를 팔로우 중인 사람을 가져오는 API
    fetchUserFollower: build.query<UserFollowType[], number>({
      query: (profilePageId) => `follower/${profilePageId}/?lastFollowingId=100000`,
      providesTags: ["user"],
    }),
    //@ description: 유저가 팔로우 중인 사람을 가져오는 API
    fetchUserFollowing: build.query<UserFollowType[], number>({
      query: (profilePageId) => `following/${profilePageId}/?lastFollowerId=100000`,
      providesTags: ["user"],
    }),
    //@ description: Ceated 탭의 데이터를 가져오는 API
    fetchCreatedData: build.query<cardType[], number>({
      query: (userId) => `/profile/user-created/${userId}/`,
      providesTags: ["profile"],
    }),
    //@ description: ForSale 탭의 데이터를 가져오는 API
    fetchForSaleData: build.query<cardType[], number>({
      query: (userId) => `/profile/user-forSale/${userId}/`,
      providesTags: ["profile"],
    }),
    //@ description: Fractions 탭의 데이터를 가져오는 API
    fetchFractionsData: build.query<DescCardType[], number>({
      query: (userId) => `/profile/user-fractions/${userId}/`,
      providesTags: ["profile"],
    }),
    //@ description: 내수익 보기 데이터를 가져오는 API
    fetchRevenueData: build.query<RevenueType, string>({
      query: (value) => `profile/margin${value}`,
      providesTags: ["profile"],
    }),
  }),
});

export const {
  useFetchUserProfileQuery,
  useFetchSettingsMutation,
  useFollowMutation,
  useUnFollowMutation,
  useFetchCreatedDataQuery,
  useFetchForSaleDataQuery,
  useFetchFractionsDataQuery,
  useFetchUserFollowerQuery,
  useFetchUserFollowingQuery,
  useFetchRevenueDataQuery,
} = userAPI;
export default userAPI;
