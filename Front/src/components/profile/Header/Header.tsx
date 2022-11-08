import { Button, ProfileImage } from "@/components/common";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { selectProfileData } from "@/store/profileDataSlice";
import style from "./Header.module.scss";
import { CopyIcon } from "@/components/icon";
import { copyAlertData } from "@/helpers/utils/copyFuction";
import { useAlert } from "@/hooks";

const Header = () => {
  const { openAlertModal } = useAlert();
  const { account } = useAppSelector(selectAccount);
  const { profileData } = useAppSelector(selectProfileData);
  const copyHandler = () => {
    const alertData = copyAlertData(account.address || "");
    openAlertModal(alertData);
  };
  return (
    <header className={style.header}>
      <div className={style.profilImage}>
        <ProfileImage url={profileData.image} size="xxxl" profileStyle="round" />
      </div>

      <section className={style.section}>
        <div className={style.leftSection}>
          <div className={style.nickname}>{account.nickname}</div>
          <div className={style.addressSection} onClick={copyHandler} aria-hidden="true">
            <div className={style.address}>{account.address}</div>
            <CopyIcon disabled />
          </div>
          <div className={style.bio}>{profileData.introduction}</div>
        </div>
        <div className={style.rightSection}>
          <div className={style.followSection}>
            <div>
              <div className={style.followTitle}>Followers</div>
              <div className={style.followNumber}>658</div>
            </div>
            <div>
              <div className={style.followTitle}>Following</div>
              <div className={style.followNumber}>213</div>
            </div>
          </div>
          <Button size="fillContainer">Follow</Button>
        </div>
      </section>
    </header>
  );
};

export default Header;
