import style from "./Banner.module.scss";
import banner from "@/assets/images/banner.jpg";

const Banner = ({ bannerUrl }: { bannerUrl: string | undefined }) => {
  return <img src={bannerUrl === "default" ? banner : bannerUrl} alt="" className={style.banner} />;
};

export default Banner;
