import { Username, Bio, WalletAddress, ProfileImg, BannerImg } from "./components";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { selectProfleStatus } from "@/store/profileStatusSlice";
import style from "./Form.module.scss";
import { Button } from "@/components/common";

export interface InitialStateProps {
  nickname: string;
  introduction: string;
  image: string;
  banner: string;
}

const initialState = {
  nickname: "둘기",
  introduction: "자기 소개",
  image:
    "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
  banner:
    "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
};

const Form = () => {
  const { account } = useAppSelector(selectAccount);
  const { profleStatus } = useAppSelector(selectProfleStatus);
  const address = account.address ? account.address : "";
  console.log(profleStatus);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const username = (form[0] as HTMLInputElement).value;
    const bio = (form[1] as HTMLInputElement).value;
    const profileImage = (form[2] as HTMLInputElement).files;
    const bannerImage = (form[3] as HTMLInputElement).files;

    const userData = {
      nickname: username,
      introduction: bio,
      image: profileImage && profileImage[0],
      banner: bannerImage && bannerImage[0],
    };
    console.log(userData);
  };

  return (
    <form onSubmit={onSubmit}>
      <section className={style.section}>
        <div className={style.leftSection}>
          <Username initialUsernmae={initialState.nickname} />
          <Bio initialBio={initialState.introduction} />
          <WalletAddress address={address} />
        </div>
        <div className={style.rightSection}>
          <ProfileImg initialUrl={initialState.image} />
          <BannerImg initialUrl={initialState.banner} />
        </div>
      </section>
      <div className={style.button}>
        <Button disabled={!(profleStatus.bioStatus && profleStatus.usernameStatus)}>SAVE</Button>
      </div>
    </form>
  );
};

export default Form;
