import { OpenAlertArg, useAlert } from "@/hooks/useAlert";

const Test = () => {
  const { openAlertModal } = useAlert();
  const openAlertHandler = () => {
    const data: OpenAlertArg = {
      content: "버튼을 클릭하였습니다.",
      style: "success",
      icon: true,
    };
    openAlertModal(data);
  };

  return <button onClick={openAlertHandler}>알럿</button>;
};
export default Test;
