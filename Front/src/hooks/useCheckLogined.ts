import { GOERLI_ID } from "@/constants/metamask";
import { getWallet, getChainId } from "@/api/blockchain";
import { useAppDispatch } from "@/hooks/useStore";
import { setAddress, logout } from "@/store/loginSlice";
import { useLoginMutation } from "@/api/server/loginAPI";

/**
 * 사용법
 * const walletAccount = useCheckLogined();
 * 로그인 안됬을 경우 "notLogined" 반환
 * 로그인 됬을 경우 chainID 반환
 */

const useCheckLogined = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  //* 지갑 체크
  const checkWallet = async () => {
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
    }
  };

  return [checkWallet];
};

export default useCheckLogined;
