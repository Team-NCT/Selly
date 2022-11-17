import style from "./ProfileImage.module.scss";
import { ProfileImageProps } from "./ProfileImage.types";
import defaultImage from "@/assets/images/profile.png";
import { CheckMarkIcon } from "@/components/icon";

const ProfileImage = ({ url, size, profileStyle, certification = false }: ProfileImageProps) => {
  //* 이미지 에러 처리
  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };
  return (
    <div className={`${style.profile_image} ${style[`size_${size}`]}`}>
      <img
        src={!url || url === "default" ? defaultImage : url}
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
