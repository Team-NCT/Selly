import style from "./ProfileImage.module.scss";
import { ProfileImageProps } from "./ProfileImage.types";
import defaultImage from "@/assets/images/profile.png";
import { CheckMarkIcon } from "@/components/icon";

const ProfileImage = ({ url, size, profileStyle, certification = false }: ProfileImageProps) => {
  //* 이미지 에러 처리
  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };
  const APIKEY = process.env.SELLY_FILESTACK_API_KEY;
  return (
    <div className={`${style.profile_image} ${style[`size_${size}`]}`}>
      <img
        src={
          !url || url === "default"
            ? defaultImage
            : `https://cdn.filestackcontent.com/${APIKEY}/resize=width:128,height:128/output=format:webp/${url}`
        }
        alt=""
        className={style[`profile_${profileStyle}`]}
        onError={handleImgError}></img>
      {certification ? (
        <div className={style.certification}>
          <CheckMarkIcon />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default ProfileImage;
