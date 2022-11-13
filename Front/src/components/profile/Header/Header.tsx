import { Button, ProfileImage } from "@/components/common";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { selectProfileData } from "@/store/profileDataSlice";
import style from "./Header.module.scss";
import { CopyIcon } from "@/components/icon";
import { copyAlertData } from "@/helpers/utils/copyFuction";
import { useAlert, useAppDispatch } from "@/hooks";
import { openFollower, openFollowing } from "@/store/modalSlice";

const Header = () => {
  const { openAlertModal } = useAlert();

  const { userId } = useAppSelector(selectAccount);
  const { profileData } = useAppSelector(selectProfileData);
  const dispatch = useAppDispatch();

  const copyHandler = () => {
    const alertData = copyAlertData(profileData.wallet || "");
    openAlertModal(alertData);
  };
  return (
    <header className={style.header}>
      <div className={style.profilImage}>
        <ProfileImage url={profileData.image} size="xxxl" profileStyle="round" />
      </div>

      <section className={style.section}>
        <div className={style.leftSection}>
          <div className={style.nickname}>{profileData.nickname}</div>
          <div className={style.addressSection} onClick={copyHandler} aria-hidden="true">
            <div className={style.address}>{profileData.wallet}</div>
            <CopyIcon disabled />
          </div>
          <div className={style.bio}>{profileData.introduction}</div>
        </div>
        <div className={style.rightSection}>
          <div className={style.followSection}>
            <button onClick={() => dispatch(openFollower())}>
              <div className={style.followTitle}>Followers</div>
              <div className={style.followNumber}>{profileData.followerCnt}</div>
            </button>
            <button onClick={() => dispatch(openFollowing())}>
              <div className={style.followTitle}>Following</div>
              <div className={style.followNumber}>{profileData.followingCnt}</div>
            </button>
          </div>
          <Button size="fillContainer" type="button">
            Follow
          </Button>
        </div>
      </section>
    </header>
  );
};

export default Header;
