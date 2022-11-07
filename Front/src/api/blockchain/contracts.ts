import Web3 from "web3";

export const SellyERC721 = process.env;
export const F_NFT_Factory = process.env;

export const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://$goerli.infura.io/v3/${process.env.SELLY_INFURA_API_KEY}`
  )
);

// export const SsafyNFTContract = new web3.eth.Contract(
// 	SsafyNFTAbi,
// 	SsafyNFTCA
// );
