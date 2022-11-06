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
  nickname: "사슴",
  introduction: "사슴 사냥",
  image:
    "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
  banner:
    "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
};

const Form = () => {
  const { account } = useAppSelector(selectAccount);
  const { profleStatus } = useAppSelector(selectProfleStatus);
  const { profileData } = useAppSelector(selectProfileData);
  const address = account.address ? account.address : "";
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
    console.log(profileData);
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
          <WalletAddress address={address} />
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
