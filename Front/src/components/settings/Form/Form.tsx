import { Username, Bio, WalletAddress } from "./components";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import style from "./Form.module.scss";

const Form = () => {
  const { account } = useAppSelector(selectAccount);
  const address = account ? account : "";

  return (
    <form>
      <section className={style.leftSection}>
        <Username />
        <Bio />
        <WalletAddress address={address} />
      </section>
    </form>
  );
};

export default Form;
