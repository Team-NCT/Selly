import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

function Settings() {
  const { account } = useAppSelector(selectAccount);

  return (
    <main>
      <h1>{account}</h1>
    </main>
  );
}

export default Settings;
