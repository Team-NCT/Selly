import { NFTDetailDescriptionProps } from "./NFTDetailDescription.types";
import style from "./NFTDetailDescription.module.scss";
import {
  NFTDescription,
  NFTDetails,
  NFTOwner,
  NFTProperties,
} from "@/components/NFTDetail/Description";

const NFTDetailDescription = ({
  contractAddress,
  description,
  nickname,
  originalAuthor,
  primaryCnt,
  properties,
  tokenId,
  image,
}: NFTDetailDescriptionProps) => {
  return (
    <section className={style.NFT_detail_descriotion}>
      <NFTOwner nickname={nickname} originalAuthor={originalAuthor} image={image} />
      <NFTDescription description={description} />
      <NFTProperties properties={properties} />
      <NFTDetails contractAddress={contractAddress} primaryCnt={primaryCnt} tokenId={tokenId} />
    </section>
  );
};

export default NFTDetailDescription;
