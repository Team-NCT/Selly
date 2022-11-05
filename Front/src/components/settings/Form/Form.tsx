import { Username, Bio, WalletAddress, ProfileImg, BannerImg } from "./components";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import style from "./Form.module.scss";

const Form = () => {
  const { account } = useAppSelector(selectAccount);
  const address = account ? account : "";

  return (
    <form className={style.section}>
      <section className={style.leftSection}>
        <Username />
        <Bio />
        <WalletAddress address={address} />
      </section>
      <section className={style.rightSection}>
        <ProfileImg />
        <BannerImg />
      </section>
    </form>
  );
};

export default Form;
