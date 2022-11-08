import { useAppSelector } from "@/hooks/useStore";
import { selectProfileData } from "@/store/profileDataSlice";
import style from "./Banner.module.scss";

const Banner = () => {
  const { profileData } = useAppSelector(selectProfileData);
  return <img src={profileData.banner} alt="" className={style.banner} />;
};

export default Banner;
