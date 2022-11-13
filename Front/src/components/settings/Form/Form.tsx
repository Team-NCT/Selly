import { Username, Bio, WalletAddress, ProfileImg, BannerImg } from "./components";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { selectProfleStatus } from "@/store/profileStatusSlice";
import style from "./Form.module.scss";
import { Button } from "@/components/common";
import { setProfileData, selectProfileData } from "@/store/profileDataSlice";
import { useEffect } from "react";

export interface InitialStateProps {
  nickname: string;
  introduction: string;
  image: string;
  banner: string;
}

//* 내프로필 API와 연결할 예정
const initialState = {
  nickname: "띠용",
  introduction: "안녕하세요.",
  image:
    "https://user-images.githubusercontent.com/97648143/200227851-cfc7fcca-7b1d-497d-8b40-f2e16e0a490e.png",
  banner:
    "https://user-images.githubusercontent.com/97648143/200227313-2782cc12-af1e-4bca-b48a-f3aaaca871e0.png",
};

const Form = () => {
  const { address } = useAppSelector(selectAccount);
  const { profleStatus } = useAppSelector(selectProfleStatus);
  const { profileData } = useAppSelector(selectProfileData);
  const walletAddress = address ? address : "";
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      nickname: profileData.nickname,
      introduction: profileData.introduction,
      image: profileData.imageFile,
      banner: profileData.bannerFile,
    };
    console.log(userData);
  };

  return (
    <form onSubmit={onSubmit}>
      <section className={style.section}>
        <div className={style.leftSection}>
          <Username />
          <Bio />
          <WalletAddress address={walletAddress} />
        </div>
        <div className={style.rightSection}>
          <ProfileImg />
          <BannerImg />
        </div>
      </section>
      <div className={style.button}>
        <Button disabled={!(profleStatus.bioStatus && profleStatus.usernameStatus)}>SAVE</Button>
      </div>
    </form>
  );
};

export default Form;
