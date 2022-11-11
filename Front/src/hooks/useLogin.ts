import { getWallet, getChainId, changeNetwork } from "@/api/blockchain";
import { GOERLI_ID, METAMASK_DOWNLOAD_LINK } from "@/constants/metamask";
import { setAddress } from "@/store/loginSlice";
import { useAppDispatch } from "@/hooks/useStore";
import { useLoginMutation } from "@/api/server/loginAPI";

const useLogin = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const loginHandler = async () => {
    //* metamask 설치 여부 확인 로직

    if (window.ethereum) {
      const chainId = await getChainId();

      //* 네트워크 변경 로직
      if (GOERLI_ID !== chainId) {
        changeNetwork(GOERLI_ID);
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
    } else {
      window.open(METAMASK_DOWNLOAD_LINK, "_blank");
    }
  };

  return [loginHandler];
};

export default useLogin;
