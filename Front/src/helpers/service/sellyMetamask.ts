import { GOERLI_ID, METAMASK_DOWNLOAD_LINK } from "@/constants/metamask";

interface SystemError {
  code: string | number;
  message: string;
}

export const getWallet = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
};

export const getChainId = async () => {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  return chainId;
};

export const changeNetwork = async (chainId: string) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (error) {
    const err = error as SystemError;

    //* MetaMask에 해당 네트워크가 없는 경우 발생하는 에러
    if (err.code === 4902) {
      console.error("This network is not found in your network!");
    } else {
      console.error("Failed to switch this network");
    }
  }
};

export const login = async () => {
  //* metamask 설치 여부 확인 로직

  if (window.ethereum) {
    const chainId = await getChainId();

    //* 네트워크 변경 로직
    if (GOERLI_ID !== chainId) {
      changeNetwork(GOERLI_ID);
    }

    const account = await getWallet();
    console.log("로그인", account);

    //! 로그인 api 연결
  } else {
    window.open(METAMASK_DOWNLOAD_LINK, "_blank");
  }
};
