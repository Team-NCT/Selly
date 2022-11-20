import style from "./NFTOwner.module.scss";
import { NFTOwnerProps } from "./NFTOwner.types";
import { Neon, ProfileImage } from "@/components/common";
import { Link } from "react-router-dom";

const NFTOwner = ({ originalAuthor, nickname, image, certification }: NFTOwnerProps) => {
  return (
    <div className={style.NFT_detail_description_owner}>
      <Neon color="ocean100" positionH="bottom" positionW="right">
        <h1>Owner</h1>
      </Neon>
      <Link to={`/profile/${originalAuthor}`}>
        <ProfileImage
          profileStyle="square"
          size={"xxs"}
          url={image}
          certification={certification}
        />
        <p>{nickname}</p>
      </Link>
    </div>
  );
};
export default NFTOwner;
