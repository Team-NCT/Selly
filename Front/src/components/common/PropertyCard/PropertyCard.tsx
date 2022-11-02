import style from "./PropertyCard.module.scss";
import { PropertyCardProps } from "./PropertyCard.types";

const PropertyCard = ({ type, name, height = "create" }: PropertyCardProps) => {
  return (
    <div className={`${style.property} ${style[height]}`}>
      <p className={style.property_type}>{type}</p>
      <p className={style.property_name}>{name}</p>
    </div>
  );
};

export default PropertyCard;
