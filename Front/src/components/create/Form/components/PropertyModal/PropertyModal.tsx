import { Modal, Label, Button, TextInput } from "@/components/common";
import { PropertyModalProps } from "./PropertyModal.types";
import style from "./PropertyModal.module.scss";
import React, { useEffect, useState } from "react";
import { propertyType } from "../Property/Property.types";

const PropertyModal = ({ close, properties, setProperties }: PropertyModalProps) => {
  //* create 페이지의 properties를 받아와서 modal의 변수에 저장, 6개보다 작다면 빈 input 보여주기
  const [modalProperties, setModalProperties] = useState<propertyType[]>(properties);
  useEffect(() => {
    if (properties.length < 6) {
      setModalProperties([...properties, { type: "", name: "" }]);
    }
  }, [properties]);

  //* add property 버튼을 누르면 빈 객체가 추가된다.
  const addPropertyHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (modalProperties.length == 0) {
      setModalProperties([{ type: "", name: "" }]);
    }
    if (modalProperties.length < 6) {
      setModalProperties([...modalProperties, { type: "", name: "" }]);
    }
  };

  //* properties의 개수가 6개가 되면 true가 되어 추가하기 버튼이 보이지 않는다.
  const [isMax, setIsMax] = useState<boolean>(false);
  useEffect(() => {
    setIsMax(modalProperties.length >= 6);
  }, [modalProperties]);

  //* input 삭제
  const deleteHandler = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    const changeProperties = [...modalProperties];
    changeProperties.splice(index, 1);
    setModalProperties(changeProperties);
  };

  //* input 입력
  const changeTypeHandler = (event: React.ChangeEvent, index: number) => {
    //* event.target.value를 활용하여 해당 index의 type속성 값을 변경시키는 함수
    const target = event.target as HTMLInputElement;
    const changeProperties = [...modalProperties];
    changeProperties[index].type = target.value;
    setModalProperties(changeProperties);
  };
  const changeNameHandler = (event: React.ChangeEvent, index: number) => {
    //* event.target.value를 활용하여 해당 index의 name속성 값을 변경시키는 함수
    const target = event.target as HTMLInputElement;
    const changeProperties = [...modalProperties];
    changeProperties[index].name = target.value;
    setModalProperties(changeProperties);
  };

  //* 저장
  const saveHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const saveProperties = modalProperties.filter(
      (property) => property.type.trim() && property.name.trim()
    );
    setProperties(saveProperties);
    close();
  };

  return (
    <Modal close={close}>
      <form className={style.property_modal_container}>
        <Label id="create_properties" color="muscat" positionH="bottom" positionW="right">
          <h1 className={style.property_modal_label}>Properties</h1>
        </Label>
        <header className={style.property_modal_header}>
          <div className={style.property_modal_title}></div>
          <div className={style.property_modal_title_type}>Type</div>
          <div className={style.property_modal_title_name}>Name</div>
        </header>
        <section className={style.property_modal_content}>
          <div>
            {modalProperties.map((modalProperty, idx) => (
              <div key={idx} className={style.property_modal_input}>
                <button
                  className={style.property_modal_delete}
                  onClick={(e) => deleteHandler(e, idx)}>
                  X
                </button>
                <TextInput
                  value={modalProperty.type}
                  id={idx.toString()}
                  status={true}
                  handleInputChange={(e) => {
                    changeTypeHandler(e, idx);
                  }}
                  maxLength={10}
                  placeHolder="Head"
                />
                <TextInput
                  value={modalProperty.name}
                  id={idx.toString()}
                  status={true}
                  handleInputChange={(e) => {
                    changeNameHandler(e, idx);
                  }}
                  maxLength={10}
                  placeHolder="Black"
                />
              </div>
            ))}
          </div>
        </section>
        <section className={style.property_modal_add_button}>
          {!isMax && (
            <Button bg="blackberry" color="none" onClick={(e) => addPropertyHandler(e)}>
              + Add Property
            </Button>
          )}
        </section>
        <section>
          <Button bg="disabled" color="none" onClick={() => close()}>
            취소
          </Button>
          <Button onClick={(e) => saveHandler(e)}>저장</Button>
        </section>
      </form>
    </Modal>
  );
};

export default PropertyModal;
