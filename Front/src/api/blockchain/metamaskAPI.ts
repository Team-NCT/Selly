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
  const token = await window.ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  return Number((token / 1000000000 / 1000000000).toFixed(4));
};
