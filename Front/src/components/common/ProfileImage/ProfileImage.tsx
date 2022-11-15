import style from "./ProfileImage.module.scss";
import { ProfileImageProps } from "./ProfileImage.types";
import defaultImage from "@/assets/images/profile.png";

const ProfileImage = ({ url, size, profileStyle }: ProfileImageProps) => {
  return (
    <img
      src={!url || url === "default" ? defaultImage : url}
      alt="user-profile"
      className={`${style[`size_${size}`]} ${style[`profile_${profileStyle}`]}`}></img>
  );
};
export default ProfileImage;
