import style from "./Banner.module.scss";
import banner from "@/assets/images/banner.jpg";

const Banner = ({ bannerUrl }: { bannerUrl: string | undefined }) => {
  const APIKEY = process.env.SELLY_FILESTACK_API_KEY;

  return (
    <img
      src={
        bannerUrl === "default"
          ? banner
          : `https://cdn.filestackcontent.com/${APIKEY}/resize=width:1440/output=format:webp/${bannerUrl}`
      }
      alt=""
      className={style.banner}
    />
  );
};

export default Banner;
