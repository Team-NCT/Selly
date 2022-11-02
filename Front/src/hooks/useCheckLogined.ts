import { GOERLI_ID, METAMASK_DOWNLOAD_LINNK } from "@/constants/metamask";
import { getWallet, getChainId } from "@/helpers/service";
import { useEffect, useCallback, useState } from "react";

/**
 * 사용법
 * const walletAccount = useCheckLogined();
 * 로그인 안됬을 경우 "notLogined" 반환
 * 로그인 됬을 경우 chainID 반환
 */

const useCheckLogined = () => {
  const [walletAccount, setWalletAccount] = useState<string>("notLogined");

  //* 로그인 체크
  const checkLogined = useCallback(async () => {
    //* 메타마스크 설치 여부 체크
    if (!window.ethereum) {
      if (window.confirm("메타마스크가 설치되어 있지 않습니다. 설치하시겠습니까?")) {
        window.open(METAMASK_DOWNLOAD_LINNK, "_blank");
      }
      return;
    }

    const account = await getWallet();
    const chainId = await getChainId();

    //* 네트워크 일치 여부 && 아이디 존재여부 확인
    if (chainId === GOERLI_ID && account) {
      await setWalletAccount(account);
    } else {
      await setWalletAccount("notLogined");
    }

    //! API연결되면 아이디 존재 여부랑 로그인확인하는 로직 추가

    return walletAccount;
  }, [walletAccount]);

  //* 로그인 확인 이벤트 등록
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        console.log("체인 바뀜");
        checkLogined();
      });
      window.ethereum.on("accountsChanged", () => {
        console.log("아이디 바뀜");
        checkLogined();
      });
    }
  });

  return walletAccount;
};

export default useCheckLogined;
