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
    </>
  );
}

export default Home;
