import { Button, ProfileImage } from "@/components/common";
import style from "./Header.module.scss";
import { CopyIcon } from "@/components/icon";
import { copyAlertData } from "@/helpers/utils/copyFuction";
import { useAlert, useAppDispatch } from "@/hooks";
import { openFollower, openFollowing } from "@/store/modalSlice";
import { useFollowMutation, useUnFollowMutation } from "@/api/server/userAPI";
import { UserProfileType } from "@/types/user.type";

const Header = ({
  profilePageId,
  userId,
  data,
}: {
  profilePageId: number;
  userId: number;
  data: UserProfileType | undefined;
}) => {
  const { openAlertModal } = useAlert();
  const [follow] = useFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const dispatch = useAppDispatch();

  const copyHandler = () => {
    const alertData = copyAlertData(data?.wallet || "");
    openAlertModal(alertData);
  };

  const followOnclickHandler = async () => {
    if (!userId) return;
    await follow({ followerId: profilePageId, followingId: userId });
  };

  const unFollowOnClickHandler = async () => {
    if (!userId) return;
    await unFollow({ followerId: profilePageId, followingId: userId });
  };

  return (
    <header className={style.header}>
      <div className={style.profilImage}>
        <ProfileImage url={data?.image} size="xxxl" profileStyle="round" />
      </div>

      <section className={style.section}>
        <div className={style.leftSection}>
          <div className={style.nickname}>{data?.nickname}</div>
          <div className={style.addressSection} onClick={copyHandler} aria-hidden="true">
            <div className={style.address}>{data?.wallet}</div>
            <CopyIcon disabled />
          </div>
          <div className={style.bio}>{data?.introduction}</div>
        </div>
        <div className={style.rightSection}>
          <div className={style.followSection}>
            <button onClick={() => dispatch(openFollower())}>
              <div className={style.followTitle}>Followers</div>
              <div className={style.followNumber}>{data?.followerCnt}</div>
            </button>
            <button onClick={() => dispatch(openFollowing())}>
              <div className={style.followTitle}>Following</div>
              <div className={style.followNumber}>{data?.followingCnt}</div>
            </button>
          </div>
          {profilePageId !== Number(userId) &&
            (!data?.myFollowing ? (
              <Button size="fillContainer" type="button" onClick={followOnclickHandler}>
                Follow
              </Button>
            ) : (
              <Button
                size="fillContainer"
                type="button"
                bg="blackberry"
                color="outline"
                onClick={unFollowOnClickHandler}>
                UnFollow
              </Button>
            ))}
        </div>
      </section>
    </header>
  );
};

export default Header;
