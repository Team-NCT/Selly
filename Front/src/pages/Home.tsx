import React from "react";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

function Home() {
  const { account } = useAppSelector(selectAccount);
  return (
    <>
      <h1>Home</h1>
      <h1>account 주소: {account}</h1>
    </>
  );
}

export default Home;
