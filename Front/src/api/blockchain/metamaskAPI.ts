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
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: chainId }],
  });
};
