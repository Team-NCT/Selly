import { Header, Form } from "@/components/settings";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

function Settings() {
  const { account } = useAppSelector(selectAccount);

  return (
    <main>
      <Header />
      <Form />
    </main>
  );
}

export default Settings;
