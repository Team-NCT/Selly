import { useState, useEffect } from "react";
import { CollectedCardList } from "./CollectedCardList";
import { getNFTsForOwnerAPI } from "@/api/blockchain";
import { selectAccount } from "@/store/loginSlice";
import { useAppSelector } from "@/hooks/useStore";
import { Spinner } from "@/components/common";
import style from "./Collected.module.scss";

const Collected = () => {
  const [NFTdatas, setNFTdatas] = useState<any>(null);
  const { address } = useAppSelector(selectAccount);

  const getOwnERC721NFTs = async () => {
    if (!address) return;
    const datas = await getNFTsForOwnerAPI(address);
    setNFTdatas(datas);
  };

  useEffect(() => {
    getOwnERC721NFTs();
  }, [address]);

  // TODO_YK: 무한 스크롤
  return (
    <section className={style.collected_section}>
      {NFTdatas ? (
        NFTdatas.length !== 0 ? (
          <CollectedCardList data={NFTdatas} />
        ) : (
          <div className={style.nft_none}>
            <p>현재 보유 중인 NFT가 없습니다</p>
            <p>(っ °Д °;)っ</p>
          </div>
        )
      ) : (
        <div className={style.spinner}>
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default Collected;
