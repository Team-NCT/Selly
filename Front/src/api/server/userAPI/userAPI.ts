import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import { UserProfileType, UserFollowType } from "@/types/user.type";
import { setAccount, logout } from "@/store/loginSlice";
import {
  fetchUserProfileParamsData,
  followDataType,
  RevenueType,
  SettingsType,
  FetchSettingsType,
  ArtistRankingType,
  NavDataType,
} from "./userAPI.types";
import type { RootState } from "@/store";
import { setProfileData } from "@/store/profileDataSlice";

const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_SERVICE_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account.token;
      const userId = (getState() as RootState).account.userId || 0;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("userId", String(userId));
      headers.set("Content-type", "application/json; charset=utf-8");

      return headers;
    },
  }),
  tagTypes: ["user", "profile", "settings", "checkNickname", "login"],
  endpoints: (build) => ({
    //@ description: 로그인 하는 API
    login: build.mutation({
      queryFn: async (
        body: { wallet: string; pwd: string },
        { dispatch },
        extraOptions,
        baseQuery
      ) => {
        try {
          const { meta } = await baseQuery({
            url: "/login",
            method: "POST",
            body: body,
          });
          const header = meta?.response?.headers;
          dispatch(
            setAccount({
              token: header?.get("token"),
              userId: header?.get("userId") ? Number(header?.get("userId")) : null,
            })
          );
          return { data: true };
        } catch (error) {
          dispatch(logout());
          return { data: false };
        }
      },

      invalidatesTags: ["login"],
    }),
    //@ description: 프로필에 들어갔을 때 유저의 정보를 fetch하는 API
    fetchUserProfile: build.query<UserProfileType, fetchUserProfileParamsData>({
      query: (param) => `users/${param.profileId}/${param.userId}`,
      providesTags: ["user", "settings"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (args.profileId === args.userId) {
          dispatch(
            setProfileData({
              nickname: data?.nickname,
              introduction: data?.introduction,
              image: data?.image,
              banner: data?.banner,
            })
          );
        }
      },
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
    //@ description: 중복 닉네임을 확인하는 API
    checkUserNickName: build.query<string, string>({
      query: (nickname) => `nicknameCheck/${nickname}`,
      providesTags: ["checkNickname"],
    }),
    //@ description: 네브바 정보를 가져오는  API
    fetchNavData: build.query<NavDataType, void>({
      query: () => "nameAndImage",
      providesTags: ["login", "settings"],
    }),
    //@ description: 유저가 팔로우 중인 사람을 가져오는 API
    fetchUserFollowing: build.query<UserFollowType[], number>({
      query: (profilePageId) => `following/${profilePageId}/?lastFollowerId=100000`,
      providesTags: ["user"],
    }),

    //@ description: 내수익 보기 데이터를 가져오는 API
    fetchRevenueData: build.query<RevenueType, void>({
      query: () => "profile/margin",
      providesTags: ["profile", "login"],
    }),
    //@ description: Artist Trend Ranking 데이터를 가져오는 API
    fetchArtistTrendingRankingData: build.query<ArtistRankingType[], void>({
      query: () => "ranking/total",
      providesTags: ["user", "settings"],
    }),
    //@ description: Artist follow Ranking 데이터를 가져오는 API
    fetchArtistTotalRankingData: build.query<ArtistRankingType[], void>({
      query: () => "ranking/trend",
      providesTags: ["user", "settings"],
    }),
  }),
});

export const {
  useLoginMutation,
  useFetchUserProfileQuery,
  useFetchSettingsMutation,
  useFollowMutation,
  useUnFollowMutation,
  useFetchUserFollowerQuery,
  useFetchUserFollowingQuery,
  useFetchRevenueDataQuery,
  useFetchArtistTotalRankingDataQuery,
  useFetchArtistTrendingRankingDataQuery,
  useCheckUserNickNameQuery,
  useFetchNavDataQuery,
} = userAPI;
export default userAPI;
