import { Label, PropertyCard } from "@/components/common";
import React, { useEffect, useState } from "react";
import style from "./Property.module.scss";
import style_form from "../../Form.module.scss";
import { PropertyType } from "./Property.types";
import PropertyModal from "../PropertyModal/PropertyModal";
import { selectModal, closeProperty, openProperty } from "@/store/modalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createPortal } from "react-dom";

const Property = () => {
  //* property를 저장하는 객체의 배열
  const [properties, setProperties] = useState<PropertyType[]>([]);

  //* properties의 개수가 6개가 되면 true가 되어 추가하기 버튼이 보이지 않는다.
  const [isMax, setIsMax] = useState<boolean>(false);
  useEffect(() => {
    setIsMax(properties.length >= 6);
  }, [properties]);

  //* properties를 누르면 property를 설정하는 모달이 뜬다.
  const { property } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(openProperty());
  };
  const closeModal = () => {
    dispatch(closeProperty());
  };
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  return (
    <div className={style.form_container}>
      <div className={style_form.form_margin}>
        <Label
          color="muscat100"
          positionH="top"
          positionW="left"
          id="create-property"
          height={65}
          vertical={5}
          horizontal={1}>
          <h2 className={style.form_title_label}>Properties</h2>
        </Label>
        <div className={style.form_title_desc}>
          NFT를 나타내줄 수 있는 속성을 지정해주세요. 최대{" "}
          <span className={style.form_title_desc_bold}>6개</span>까지 생성 가능합니다.
        </div>
      </div>
      <button className={style.form_property_container} onClick={(e) => openModal(e)}>
        {properties.map((property, idx) => (
          <div className={`${style.form_property_item} property`} key={idx}>
            <PropertyCard {...property}></PropertyCard>
          </div>
        ))}
        {isMax ? (
          ""
        ) : (
          <div className={style.form_property_item}>
            <PropertyCard type="추가하기" name="+"></PropertyCard>
          </div>
        )}
      </button>
      {property &&
        createPortal(
          <PropertyModal
            close={closeModal}
            properties={properties}
            setProperties={setProperties}
          />,
          el
        )}
    </div>
  );
};

export default Property;
