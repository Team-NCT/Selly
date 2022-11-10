import React, { useEffect, useState } from "react";
import { Button } from "@/components/common";
import { Description, Image, Title, Link, Property } from "./components";
import { createNFT } from "@/api/IPFS";
import style from "./Form.module.scss";
import { useCreateMutation } from "@/api/server/createNFTAPI";
import { selectAccount } from "@/store/loginSlice";
import { useAppSelector } from "@/hooks";

const Form = () => {
  const [create] = useCreateMutation();
  const { account } = useAppSelector(selectAccount);

  //* 제출한 form
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    //* IPFS에 업로드하는 함수
    const promise = createNFT(event);
    //* 업로드 후 metadataURl, ImageURL, title을 반환한다.
    promise.then((data) => {
      const metadataUrl = data?.metadataUrl;
      const imageUrl = data?.imageUrl;
      const title = data?.title;
      //@ TodoJY: authAPI 변경되면 owner받아와서 넣도록 수정
      const body = JSON.stringify({
        wallet: account.address,
        metaDataUrl: metadataUrl,
        articleImgUrl: imageUrl,
        owner: 46,
        articleName: title,
      });
      create(body);
    });
  };

  //* 유효성 검사를 모두 통과하면 Create 버튼이 활성화된다.
  const [isFormTrue, setIsFormTrue] = useState<boolean>(false);
  const [isImageTrue, setIsImageTrue] = useState<boolean>(false);
  const [isTitleTrue, setIsTitleTrue] = useState<boolean>(false);
  const [isLinkTrue, setIsLinkTrue] = useState<boolean>(true);
  useEffect(() => {
    setIsFormTrue(isImageTrue && isTitleTrue && isLinkTrue);
  }, [isImageTrue, isTitleTrue, isLinkTrue]);

  return (
    <form id="create-form" onSubmit={(e) => submitHandler(e)}>
      <section className={style.form_container}>
        <div className={style.image_title_description}>
          <div className={style.image}>
            <Image setIsImageTrue={setIsImageTrue} />
          </div>
          <div className={style.title_description}>
            <Title setIsTitleTrue={setIsTitleTrue} />
            <Description />
          </div>
        </div>
        <div className={style.form_item}>
          <Link setIsLinkTrue={setIsLinkTrue} />
          <button onClick={(e) => e.preventDefault()}></button>
        </div>
        <Property />
        <div className={style.submit_button}>
          <Button form="create-form" disabled={!isFormTrue}>
            create
          </Button>
        </div>
      </section>
    </form>
  );
};

export default Form;
