import { GOERLI_ID } from "@/constants/metamask";
import { getWallet, getChainId } from "@/api/blockchain";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setAddress, logout, selectAccount } from "@/store/loginSlice";
import { useLoginMutation } from "@/api/server/loginAPI";
import { useAlert } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { isMobileWeb } from "@/helpers/utils/checkDevice";

const useCheckLogined = () => {
  const { openAlertModal } = useAlert();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { account } = useAppSelector(selectAccount);
  const goPage = useNavigate();

  //* 지갑 체크
  const checkWallet = async () => {
    console.log(isMobileWeb());
    try {
      //* 메타마스크 설치 여부 체크
      if (!window.ethereum) {
        dispatch(logout());
        return;
      }

      const address = await getWallet();
      const chainId = await getChainId();

      //* 네트워크 일치 여부 && 아이디 존재여부 확인
      if (chainId !== GOERLI_ID && address) {
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

  const checkWalletAccount = () => {
    checkWallet();
    // openAlertModal({
    //   content: "계정이 변경 되었습니다.",
    //   style: "info",
    //   icon: true,
    // });
  };

  return [checkWallet, checkWalletAccount];
};

export default useCheckLogined;
