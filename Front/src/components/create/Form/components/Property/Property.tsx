import { Label } from "@/components/common";
import style from "./Property.module.scss";

const Property = () => {
  return (
    <>
      <div className={style.form_title}>
        <h2 className={style.form_title_label}>
          <Label
            color="muscat100"
            positionH="top"
            positionW="left"
            id="create-property"
            height={65}
            vertical={5}>
            Properties
          </Label>
        </h2>
        <span className={style.form_title_desc}>
          NFT를 나타내줄 수 있는 속성을 지정해주세요. 최대{" "}
          <span className={style.form_title_desc_bold}>6개</span>까지 생성 가능합니다.
        </span>
      </div>
    </>
  );
};

export default Property;
