import { Modal, Label, Button, TextInput } from "@/components/common";
import { PropertyModalProps } from "./PropertyModal.types";
import style from "./PropertyModal.module.scss";
import { useEffect, useState } from "react";
import { propertyType } from "../Property/Property.types";
import { useInputState } from "@/hooks";

const PropertyModal = ({ close, properties, setProperties }: PropertyModalProps) => {
  //* create 페이지의 properties를 받아와서 modal의 변수에 저장, 6개보다 작다면 빈 input 보여주기
  const [modalProperties, setModalProperties] = useState<propertyType[]>(properties);
  useEffect(() => {
    if (properties.length < 6) {
      setModalProperties([...properties, { type: "", name: "" }]);
    }
  }, []);
  //* add property 버튼을 누르면 빈 객체가 추가된다.
  const addPropertyHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (modalProperties.length == 0) {
      setModalProperties([{ type: "", name: "" }]);
    }
    if (
      modalProperties.length < 6 &&
      modalProperties[-1].type.trim() &&
      modalProperties[-1].name.trim()
    ) {
      setModalProperties([...properties, { type: "", name: "" }]);
    }
  };
  //* properties의 개수가 6개가 되면 true가 되어 추가하기 버튼이 보이지 않는다.
  const [isMax, setIsMax] = useState<boolean>(false);
  useEffect(() => {
    setIsMax(modalProperties.length >= 6);
  }, [modalProperties]);

  const [value, handleInputChange] = useInputState();

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
                <span className={style.property_modal_delete}>X</span>
                <TextInput
                  value={modalProperty.type}
                  id={idx.toString()}
                  status={true}
                  handleInputChange={handleInputChange}
                  maxLength={10}
                />
                <TextInput
                  value={modalProperty.name}
                  id={idx.toString()}
                  status={true}
                  handleInputChange={handleInputChange}
                  maxLength={10}
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
      </form>
    </Modal>
  );
};

export default PropertyModal;
