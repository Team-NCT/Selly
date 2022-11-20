import style from "./Banner.module.scss";
import banner from "@/assets/images/banner.jpg";

const Banner = ({ bannerUrl }: { bannerUrl: string | undefined }) => {
  const APIKEY = process.env.SELLY_FILESTACK_API_KEY;

  return (
    <img
      src={
        bannerUrl === "default"
          ? banner
          : `https://cdn.filestackcontent.co/resize=width:1440/${APIKEY}/output=format:webp/${bannerUrl}`
      }
      alt=""
      className={style.banner}
    />
  );
};

export default Banner;
