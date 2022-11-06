import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { selectProfileData } from "@/store/profileDataSlice";
import { Neon } from "@/components/common";
import style from "./Header.module.scss";

const Header = () => {
  const { account } = useAppSelector(selectAccount);
  const { profileData } = useAppSelector(selectProfileData);
  return (
    <header className={style.header}>
      <img src={profileData.banner} alt="" className={style.banner} />
    </header>
  );
};

export default Header;
