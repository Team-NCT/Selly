import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import { setToken } from "@/store/loginSlice";

const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_SERVICE_API,
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    //@ description: 로그인 하는 API
    login: build.mutation({
      query: (body: { wallet: string; pwd: string }) => ({
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        url: "/login",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          dispatch(setToken({ token: meta?.response?.headers.get("token") }));
        } catch (error) {
          console.log("에러: ", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginAPI;
export default loginAPI;
