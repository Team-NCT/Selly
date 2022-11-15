import style from "./ProfileImage.module.scss";
import { ProfileImageProps } from "./ProfileImage.types";
import defaultImage from "@/assets/images/profile.png";

const ProfileImage = ({ url, size, profileStyle }: ProfileImageProps) => {
  //* 이미지 에러 처리
  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };
  return (
    <img
      src={!url || url === "default" ? defaultImage : url}
      alt=""
      className={`${style[`size_${size}`]} ${style[`profile_${profileStyle}`]}`}
      onError={handleImgError}></img>
  );
};
export default ProfileImage;
