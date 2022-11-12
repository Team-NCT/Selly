import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import { UserProfileType } from "@/types/user.type";
import { fetchUserProfileParamsData, followDataType } from "./userAPI.types";

const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${USER_SERVICE_API}` }),
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
  }),
});

export const { useFetchUserProfileQuery, useFollowMutation, useUnFollowMutation } = userAPI;
export default userAPI;
