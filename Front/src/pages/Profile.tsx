import { Header } from "@/components/profile";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

function Profile() {
  const { account } = useAppSelector(selectAccount);

  return (
    <main>
      <Header />
    </main>
  );
}

export default Profile;
