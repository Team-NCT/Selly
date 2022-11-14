import style from "./NFTOwner.module.scss";
import { NFTOwnerProps } from "./NFTOwner.types";
import { Neon, ProfileImage } from "@/components/common";
import { useNavigate } from "react-router-dom";

const NFTOwner = ({ originalAuthor, nickname, image }: NFTOwnerProps) => {
  const navigate = useNavigate();
  const handleNFTOwnerClick = () => {
    navigate(`/profile/${originalAuthor}`);
  };
  return (
    <div className={style.NFT_detail_description_owner}>
      <Neon color="ocean100" positionH="bottom" positionW="right">
        <h1>Owner</h1>
      </Neon>
      <button onClick={handleNFTOwnerClick}>
        <ProfileImage profileStyle="square" size={"xxs"} url={image} />
        <p>{nickname}</p>
      </button>
    </div>
  );
};
export default NFTOwner;
