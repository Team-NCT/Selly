import { Label } from "@/components/common";
import style from "./WalletAddress.module.scss";
import { useAlert } from "@/hooks";
import { CopyIcon } from "@/components/icon";
import { copyAlertData } from "@/helpers/utils/copyFuction";

type Props = {
  address: string;
};

const WalletAddress = ({ address = "" }: Props) => {
  const { openAlertModal } = useAlert();

  const copyHandler = () => {
    const alertData = copyAlertData(address);
    openAlertModal(alertData);
  };

  return (
    <section className={style.section}>
      <Label
        color="ocean"
        height={60}
        horizontal={3}
        id="address"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={22}>
        <span className={style.labelText}>Wallet Address</span>
      </Label>
      <div className={style.address} onClick={copyHandler} aria-hidden="true">
        <span className={style.text}>{address}</span>
        <CopyIcon disabled />
      </div>
    </section>
  );
};
export default WalletAddress;
