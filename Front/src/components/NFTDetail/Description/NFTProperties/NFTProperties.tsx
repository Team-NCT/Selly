import { useState } from "react";
import style from "./NFTProperties.module.scss";
import { NFTPropertiesProps } from "./NFTProperties.types";
import { Neon, PropertyCard } from "@/components/common";

const NFTProperties = ({ properties }: NFTPropertiesProps) => {
  const [NFTProperties, setNFTProperties] = useState(properties.slice(0, 6));
  const handleButtonClick = () => {
    setNFTProperties(properties);
  };
  return (
    <div className={style.NFT_detail_description_properties}>
      <Neon color="muscat150" positionH="bottom" positionW="right">
        <h1>Properties</h1>
      </Neon>

      {/* Property 카드 */}
      <div className={style.NFT_detail_description_properties_cards}>
        {NFTProperties.map((item, index) => {
          return (
            <PropertyCard
              key={index}
              type={item.trait_type}
              name={item.value}
              height="detail"></PropertyCard>
          );
        })}
      </div>

      {/* 속성이 3개보다 적거나, 속성이 전부 보여졌으면 더보기 버튼이 보이지 않는다. */}
      <button
        onClick={handleButtonClick}
        hidden={properties.length <= 3 || NFTProperties === properties}>
        더보기
      </button>
    </div>
  );
};

export default NFTProperties;
