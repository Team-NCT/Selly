import { NFTDetailDescriptionProps } from "./NFTDetailDescription.types";
import style from "./NFTDetailDescription.module.scss";
import {
  NFTDescription,
  NFTDetails,
  NFTOwner,
  NFTProperties,
} from "@/components/NFTDetail/Description";

//TODO_JK : API 수정되면 교체
const primaryCnt = 100;

const NFTDetailDescription = ({
  contractAddress,
  tokenId,
  user,
  metaData,
  primaryCnt,
}: NFTDetailDescriptionProps) => {
  return (
    <section className={style.NFT_detail_description}>
      <NFTOwner nickname={user.nickname} originalAuthor={user.userId} image={user.image} />
      <NFTDescription description={metaData.description} />
      {metaData.attributes.length > 0 && <NFTProperties properties={metaData.attributes} />}
      <NFTDetails contractAddress={contractAddress} primaryCnt={primaryCnt} tokenId={tokenId} />
    </section>
  );
};

export default NFTDetailDescription;
