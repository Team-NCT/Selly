import { Label } from "@/components/common";
import style from "./WalletAddress.module.scss";
import { OpenAlertArg, useAlert } from "@/hooks";
import { CopyIcon } from "@/components/icon";

type Props = {
  address: string;
};

const WalletAddress = ({ address = "" }: Props) => {
  const { openAlertModal } = useAlert();
  const copyHanler = async () => {
    try {
      await navigator.clipboard.writeText(address);
      const data: OpenAlertArg = {
        content: "복사 되었습니다.",
        style: "success",
        icon: true,
      };
      openAlertModal(data);
    } catch (error) {
      const data: OpenAlertArg = {
        content: "복사 실패했습니다.",
        style: "error",
        icon: true,
      };
      openAlertModal(data);
    }
  };

  return (
    <section>
      <Label
        color="ocean"
        height={60}
        horizontal={3}
        id="address"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={22}>
        Wallet Address
      </Label>
      <div className={style.input_text} onClick={copyHanler} aria-hidden="true">
        {address}
        <CopyIcon />
      </div>
    </section>
  );
};
export default WalletAddress;
