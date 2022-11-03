import React from "react";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { Button } from "@/components";
import { login } from "@/helpers/service";
// import { useLoginMutation } from "@/api/UserAPI/loginAPI";

function Home() {
  const { account } = useAppSelector(selectAccount);

  // const [login, response] = useLoginMutation();

  const onSubmit = () => {
    // const loginData = {
    //   wallet: "0xE78957BEe9B38862389a6640D485Ee51e9F31B33",
    //   pwd: "0xE78957BEe9B38862389a6640D485Ee51e9F31B33",
    // };
    // login(loginData);

    fetch("http://k7b102.p.ssafy.io:8000/selly-user-service/users", {
      method: "POST",
      body: JSON.stringify({
        wallet: "0xE78957BEe9B38862389a6640D485Ee51e9F31B33",
        pwd: "0xE78957BEe9B38862389a6640D485Ee51e9F31B33",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <h1>Home</h1>
      <h1>account 주소: {account}</h1>
      <Button onClick={login}>로그인</Button>
      <Button onClick={onSubmit}>확인</Button>
      <h1>user: {process.env.SELLY_USER_SERVICE_API}</h1>
      <h1>trade: {process.env.SELLY_TRADE_SERVICE_API}</h1>
      <h1>article: {process.env.SELLY_ARTICLE_SERVICE_API}</h1>
      <h1>search: {process.env.SELLY_SEARCH_SERVICE_API}</h1>
    </>
  );
}

export default Home;
