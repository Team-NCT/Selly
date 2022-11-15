import { Button, ProfileImage } from "@/components/common";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { selectProfileData } from "@/store/profileDataSlice";
import style from "./Header.module.scss";
import { CopyIcon } from "@/components/icon";
import { copyAlertData } from "@/helpers/utils/copyFuction";
import { useAlert, useAppDispatch } from "@/hooks";
import { openFollower, openFollowing } from "@/store/modalSlice";
import {
  useFetchUserProfileQuery,
  useFollowMutation,
  useUnFollowMutation,
} from "@/api/server/userAPI";

const Header = ({ profileId }: { profileId: number }) => {
  const { openAlertModal } = useAlert();
  const { data, isError, isLoading } = useFetchUserProfileQuery({
    profileId: profileId,
    userId: 0,
  });
  const [follow] = useFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const { userId } = useAppSelector(selectAccount);
  const { profileData } = useAppSelector(selectProfileData);
  const dispatch = useAppDispatch();

  const copyHandler = () => {
    const alertData = copyAlertData(profileData.wallet || "");
    openAlertModal(alertData);
  };

  const followOnclickHandler = async () => {
    console.log(profileId);
    if (!account.userId) {
      return;
    }
    const res = await follow({ followerId: account.userId, followingId: profileId }).unwrap();
    console.log(res);
  };

  const unFollowOnClickHandler = async () => {
    if (!account.userId) return;
    const res = await unFollow({ followerId: account.userId, followingId: profileId }).unwrap();
    console.log(res);
  };

  const testFetchUser = () => {
    console.log(profileId);
    console.log("데이터", data);
    console.log("에러", isError);
    console.log("로딩", isLoading);
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
          {/* <Button size="fillContainer" type="button" onClick={testFetchUser}>
            테스트 페치
          </Button>
          <Button size="fillContainer" type="button" onClick={followOnclickHandler}>
            Follow
          </Button>
          <Button size="fillContainer" type="button" onClick={unFollowOnClickHandler}>
            UnFollow
          </Button> */}

          {data?.myFollowing ? (
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
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
