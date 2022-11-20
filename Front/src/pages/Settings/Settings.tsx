import { Header, Form } from "@/components/settings";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Settings() {
  const { userId } = useAppSelector(selectAccount);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/404", { replace: false });
    }
  }, [navigate, userId]);

  return (
    <main>
      <Header />
      <Form />
    </main>
  );
}

export default Settings;
