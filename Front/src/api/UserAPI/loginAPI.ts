import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";

const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({ baseUrl: USER_SERVICE_API }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    //@ description: 로그인 하는 API
    login: build.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginAPI;
export default loginAPI;
