import React from "react";
import { Button } from "@/components/common";
import { Description, Image, Title, Link, Property } from "./components";
import createNFT from "@/helpers/service/createNFT";
import { OpenAlertArg, useAlert } from "@/hooks";
import style from "./Form.module.scss";

const Form = () => {
  const { openAlertModal } = useAlert();
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as unknown as HTMLInputElement[];

    //* image가 없으면 error alert
    if (target[0].files?.length === 0) {
      const data: OpenAlertArg = {
        content: "이미지는 필수 항목입니다.",
        style: "error",
        icon: false,
      };
      openAlertModal(data);
      return;
    }

    //* title이 없으면 error alert
    else if (target[1].value?.trim().length === 0) {
      const data: OpenAlertArg = {
        content: "작품명은 필수 항목입니다.",
        style: "error",
        icon: false,
      };
      openAlertModal(data);
      return;
    } else {
      //* IPFS에 업로드하는 함수
      const promise = createNFT(event);
      //* 업로드 후 metadataURl, ImageURL, title을 반환한다.
      promise.then((data) => {
        const metadataUrl = data?.metadataUrl;
        const imageUrl = data?.imageUrl;
        const title = data?.title;
        console.log("metadata", metadataUrl);
        console.log("image", imageUrl);
        console.log("title", title);
      });
    }
  };
  return (
    <form id="create-form" onSubmit={(e) => submitHandler(e)}>
      <section className={style.form_container}>
        <div className={style.image_title_description}>
          <div className={style.image}>
            <Image />
          </div>
          <div className={style.title_description}>
            <Title />
            <Description />
          </div>
        </div>
        <div className={style.form_item}>
          <Link />
          <button onClick={(e) => e.preventDefault()}></button>
        </div>
        <Property />
        <div className={style.submit_button}>
          <Button form="create-form">create</Button>
        </div>
      </section>
    </form>
  );
};

export default Form;
