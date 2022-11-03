import style from "./NFTOwner.module.scss";
import { NFTOwnerProps } from "./NFTOwner.types";
import { Neon, ProfileImage } from "@/components/common";

const NFTOwner = ({ ownerName, ownerProfileUrl, ownerUid }: NFTOwnerProps) => {
  const handleNFTOwnerClick = () => {
    //TODO_SY: ownerUid를 활용하여 해당 유저의 프로필 페이지로 이동
    console.log(`${ownerUid}로 이동`);
  };
  return (
    <div className={style.NFT_detail_description_owner}>
      <Neon color="ocean100" positionH="bottom" positionW="right">
        <h1>Owner</h1>
      </Neon>
      <button onClick={handleNFTOwnerClick}>
        <ProfileImage profileStyle="square" size={"xxs"} url={ownerProfileUrl} />
        <p>{ownerName}</p>
      </button>
    </div>
  );
};
export default NFTOwner;
