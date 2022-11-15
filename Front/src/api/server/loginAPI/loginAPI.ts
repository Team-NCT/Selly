import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import { setAccount, logout } from "@/store/loginSlice";

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
          const header = meta?.response?.headers;
          dispatch(setAccount({ token: header?.get("token"), userId: header?.get("userId") }));
        } catch (error) {
          console.log("실패용");
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginAPI;
export default loginAPI;
