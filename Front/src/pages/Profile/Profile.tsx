import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { Header, Revenue, Banner, ProfileTab, FollowModal } from "@/components/profile";
import { useAppSelector } from "@/hooks/useStore";
import { selectModal } from "@/store/modalSlice";
import { selectAccount } from "@/store/loginSlice";
import { useFetchUserProfileQuery } from "@/api/server/userAPI";

function Profile() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  const { follower, following } = useAppSelector(selectModal);
  const { userId } = useAppSelector(selectAccount);
  const { data } = useFetchUserProfileQuery({
    profileId: Number(id),
    userId: Number(userId),
  });

  return (
    <>
      <Banner bannerUrl={data?.banner} />
      <main>
        <Header profilePageId={Number(id)} userId={Number(userId)} data={data} />
        <Revenue />
        <ProfileTab />
      </main>
      {follower &&
        createPortal(
          <FollowModal type="FOLLOWER" nickname={data?.nickname} profilePageId={Number(id)} />,
          el
        )}
      {following &&
        createPortal(
          <FollowModal type="FOLLOWING" nickname={data?.nickname} profilePageId={Number(id)} />,
          el
        )}
    </>
  );
}

export default Profile;
