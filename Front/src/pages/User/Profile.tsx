import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { Header, Revenue, Banner, ProfileTab, FollowModal } from "@/components/profile";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { useEffect } from "react";
import { setProfileData } from "@/store/profileDataSlice";
import { selectModal } from "@/store/modalSlice";

const DUMMY_PROFILEDATA = {
  userId: 1,
  wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
  nickname: "김작가작가가가작가용",
  introduction:
    "안녕안녕 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요",
  image:
    "https://user-images.githubusercontent.com/97648143/200227851-cfc7fcca-7b1d-497d-8b40-f2e16e0a490e.png",
  banner:
    "https://user-images.githubusercontent.com/97648143/200227313-2782cc12-af1e-4bca-b48a-f3aaaca871e0.png",
  followerCnt: 56,
  followingCnt: 76,
  myFollowing: false,
};

function Profile() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  const { follower, following } = useAppSelector(selectModal);

  // TODO_SY : params id로 유저 조회  API 연결
  useEffect(() => {
    dispatch(
      setProfileData({
        userId: DUMMY_PROFILEDATA.userId,
        wallet: DUMMY_PROFILEDATA.wallet,
        nickname: DUMMY_PROFILEDATA.nickname,
        introduction: DUMMY_PROFILEDATA.introduction,
        image: DUMMY_PROFILEDATA.image,
        banner: DUMMY_PROFILEDATA.banner,
        followerCnt: DUMMY_PROFILEDATA.followerCnt,
        followingCnt: DUMMY_PROFILEDATA.followingCnt,
        myFollowing: DUMMY_PROFILEDATA.myFollowing,
      })
    );
  }, []);

  return (
    <>
      <Banner />
      <main>
        <Header />
        <Revenue />
        <ProfileTab />
      </main>
      {follower && createPortal(<FollowModal type="FOLLOWER" />, el)}
      {following && createPortal(<FollowModal type="FOLLOWING" />, el)}
    </>
  );
}

export default Profile;
