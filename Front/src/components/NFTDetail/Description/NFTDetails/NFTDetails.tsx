import style from "./NFTDetails.module.scss";
import { NFTDetailsProps } from "./NFTDetails.types";
import { Neon } from "@/components/common";
import { GOERIL_ETHERSCAN_LINK } from "@/constants/metamask";

const NFTDetail = ({ contractAddress, primaryCnt, tokenId }: NFTDetailsProps) => {
  return (
    <div className={style.NFT_detail_description_details}>
      <Neon color="marmalade150" positionH="bottom" positionW="right">
        <h1>Details</h1>
      </Neon>
      <div className={style.NFT_detail_description_details_list}>
        <div>
          <h2>ContractAddress</h2>
          <a
            href={GOERIL_ETHERSCAN_LINK + contractAddress}
            target="_blank"
            rel="noopener noreferrer">
            {contractAddress}
          </a>
        </div>
        <div>
          <h2>TotalFractions</h2>
          <p>{primaryCnt}</p>
        </div>
        <div>
          <h2>TokenId</h2>
          <p>{tokenId}</p>
        </div>
        <div>
          <h2>TokenStandard</h2>
          <p>ERC-721</p>
        </div>
        <div>
          <h2>Blockchain</h2>
          <p>Ethereum</p>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
