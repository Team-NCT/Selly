import { Header, Revenue, Banner, ProfileTab } from "@/components/profile";
import { useAppDispatch } from "@/hooks/useStore";
import { useEffect } from "react";
import { useLoginMutation } from "@/api/server/loginAPI";
import { setProfileData } from "@/store/profileDataSlice";
import { Button } from "@/components/common";

const initialState = {
  nickname: "띠용",
  introduction:
    "안녕안녕 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요",
  image:
    "https://user-images.githubusercontent.com/97648143/200227851-cfc7fcca-7b1d-497d-8b40-f2e16e0a490e.png",
  banner:
    "https://user-images.githubusercontent.com/97648143/200227313-2782cc12-af1e-4bca-b48a-f3aaaca871e0.png",
};

function Profile() {
  const [login, { data: loginData, isSuccess, isError, error }] = useLoginMutation();
  const testData = {
    wallet: "0xf7A70bF5441A6b523d35F0002f3bd037BcbC2f6211",
    pwd: "0xf7A70bF5441A6b523d35F0002f3bd037BcbC2f6211",
  };

  const onSubmit = async () => {
    await login(testData);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setProfileData({
        nickname: initialState.nickname,
        introduction: initialState.introduction,
        image: initialState.image,
        banner: initialState.banner,
      })
    );
  }, []);

  return (
    <>
      <Banner />
      <main>
        <Header />
        <Revenue />
        <ProfileTab />
        <Button onClick={onSubmit}>로그인</Button>
      </main>
    </>
  );
}

export default Profile;
