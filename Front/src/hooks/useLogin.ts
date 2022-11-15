import { getWallet, getChainId, changeNetwork } from "@/api/blockchain";
import { GOERLI_ID, METAMASK_DOWNLOAD_LINK } from "@/constants/metamask";
import { setAddress } from "@/store/loginSlice";
import { useAppDispatch } from "@/hooks/useStore";
import { useLoginMutation } from "@/api/server/loginAPI";
import { useAlert, useSetGoerli } from "@/hooks";
import { isMobileWeb } from "@/helpers/utils/checkDevice";

const useLogin = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { openAlertModal } = useAlert();
  const [setGoerliToken] = useSetGoerli();

  const loginHandler = async () => {
    //* 모바일 환경 체크
    if (isMobileWeb()) {
      openAlertModal({
        content: "모바일에서는 로그인하실 수 없습니다.",
        style: "info",
        icon: true,
      });
      return;
    }

    //* metamask 설치 여부 확인 로직
    if (window.ethereum) {
      const chainId = await getChainId();

      //* 네트워크 변경 로직(취소 시 로그인 실패)
      if (GOERLI_ID !== chainId) {
        try {
          await changeNetwork(GOERLI_ID);
        } catch {
          openAlertModal({
            content: "네트워크 변경을 취소하셨습니다.",
            style: "error",
            icon: false,
          });
          return;
        }
      }

      const address = await getWallet();

      await login({
        wallet: address,
        pwd: address,
      });

      dispatch(
        setAddress({
          address: address,
        })
      );

      setGoerliToken();
    } else {
      window.open(METAMASK_DOWNLOAD_LINK, "_blank");
    }
  };

  return [loginHandler];
};

export default useLogin;
