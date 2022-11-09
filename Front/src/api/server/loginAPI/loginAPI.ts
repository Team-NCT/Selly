import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_SERVICE_API } from "@/constants/server";
import { RootState } from "@/store";
import { setToken } from "@/store/loginSlice";

const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_SERVICE_API,
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: ["Post"],
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
        responseHandler: (response) => setToken(response.headers.get("token")),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = loginAPI;
export default loginAPI;
