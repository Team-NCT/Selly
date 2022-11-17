import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Revenue, Banner, ProfileTab, FollowModal } from "@/components/profile";
import { useAppSelector } from "@/hooks/useStore";
import { selectModal } from "@/store/modalSlice";
import { selectAccount } from "@/store/loginSlice";
import { useFetchUserProfileQuery } from "@/api/server/userAPI";
import { useEffect } from "react";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  const { follower, following } = useAppSelector(selectModal);
  const { userId } = useAppSelector(selectAccount);
  const { data, error } = useFetchUserProfileQuery({
    profileId: Number(id),
    userId: Number(userId),
  });

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  return (
    <>
      <Banner bannerUrl={data?.banner} />
      <main>
        <Header profilePageId={Number(id)} userId={Number(userId)} data={data} />
        {Number(id) === userId && <Revenue />}
        <ProfileTab wallet={data?.wallet} />
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
