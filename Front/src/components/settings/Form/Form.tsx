import { Username, Bio, WalletAddress } from "./components";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

const Form = () => {
  const { account } = useAppSelector(selectAccount);
  const address = account ? account : "";

  return (
    <form>
      <Username />
      <Bio />
      <WalletAddress address={address} />
    </form>
  );
};

export default Form;
