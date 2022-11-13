import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const getWallet = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error: unknown) {
    const err = error as Error;
    return err.code;
  }
};

export const getChainId = async () => {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  return chainId;
};

export const changeNetwork = async (chainId: string) => {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: chainId }],
  });
};

export const getGoerliToken = async (account: string) => {
  const token = await web3.eth.getBalance(account);
  return Number(Number(web3.utils.fromWei(token)).toFixed(4));
};
