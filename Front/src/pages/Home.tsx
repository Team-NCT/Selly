import React from "react";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { Button } from "@/components";
import { login } from "@/helpers/service";

function Home() {
  const { account } = useAppSelector(selectAccount);
  console.log(process.env.SELLY_TRADE_SERVICE_API);
  return (
    <>
      <h1>Home</h1>
      <h1>account 주소: {account.address}</h1>
      <Button onClick={login}>로그인</Button>
      <h1>user: {process.env.SELLY_USER_SERVICE_API}</h1>
      <h1>trade: {process.env.SELLY_TRADE_SERVICE_API}</h1>
      <h1>article: {process.env.SELLY_ARTICLE_SERVICE_API}</h1>
      <h1>search: {process.env.SELLY_SEARCH_SERVICE_API}</h1>
    </>
  );
}

export default Home;
