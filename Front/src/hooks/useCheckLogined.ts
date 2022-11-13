import { GOERLI_ID } from "@/constants/metamask";
import { getWallet, getChainId } from "@/api/blockchain";
import { useAppDispatch } from "@/hooks/useStore";
import { setAddress, logout } from "@/store/loginSlice";
import { useLoginMutation } from "@/api/server/loginAPI";
import { useAlert } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { isMobileWeb } from "@/helpers/utils/checkDevice";

const useCheckLogined = () => {
  const { openAlertModal } = useAlert();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const goPage = useNavigate();

  //* 지갑 체크
  const checkWallet = async () => {
    try {
      //* 모바일 환경 체크
      if (isMobileWeb()) {
        dispatch(logout());
        return;
      }

      //* 메타마스크 설치 여부 체크
      if (!window.ethereum) {
        dispatch(logout());
        return;
      }

      const address = await getWallet();
      const chainId = await getChainId();

      //* 네트워크 일치 여부 && 메타마스크 잠금 여부 확인
      if (chainId !== GOERLI_ID && address !== -32002) {
        dispatch(logout());
        goPage("/");
        openAlertModal({
          content: "네트워크가 변경되어 로그아웃 되었습니다.",
          style: "error",
          icon: false,
        });
        return;
      }

      await login({
        wallet: address,
        pwd: address,
      });

      dispatch(
        setAddress({
          address: address,
        })
      );
    } catch {
      dispatch(logout());
      goPage("/");
      openAlertModal({
        content: "로그아웃 되었습니다.",
        style: "error",
        icon: false,
      });
    }
  };

  const checkWalletAccount = async () => {
    checkWallet();
    const address = await getWallet();
    if (address === -32002) {
      dispatch(logout());
      openAlertModal({
        content: "지갑이 잠금되었습니다.",
        style: "error",
        icon: false,
      });
      // } else {
      //   openAlertModal({
      //     content: "계정이 변경 되었습니다.",
      //     style: "info",
      //     icon: true,
      //   });
      // }
    }
  };

  return [checkWallet, checkWalletAccount];
};

export default useCheckLogined;
