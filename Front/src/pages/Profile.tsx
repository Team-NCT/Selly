import { Header, Revenue, Banner } from "@/components/profile";
import { useAppDispatch } from "@/hooks/useStore";
import { useEffect } from "react";
import { setProfileData } from "@/store/profileDataSlice";

const initialState = {
  nickname: "띠용",
  introduction: "안녕하세요.",
  image:
    "https://user-images.githubusercontent.com/97648143/200227851-cfc7fcca-7b1d-497d-8b40-f2e16e0a490e.png",
  banner:
    "https://user-images.githubusercontent.com/97648143/200227313-2782cc12-af1e-4bca-b48a-f3aaaca871e0.png",
};

function Profile() {
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
      </main>
    </>
  );
}

export default Profile;
