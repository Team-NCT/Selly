import React, { useEffect, useState } from "react";
import { Button, LoadingModal } from "@/components/common";
import { Description, Image, Title, Link, Property } from "./components";
import { createNFT } from "@/api/IPFS";
import style from "./Form.module.scss";
import { useCreateMutation } from "@/api/server/createNFTAPI";
import { selectAccount } from "@/store/loginSlice";
import { OpenAlertArg, useAlert, useAppDispatch, useAppSelector, useLogin } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { closeLoading, openLoading, selectModal } from "@/store/modalSlice";
import { createPortal } from "react-dom";

const Form = () => {
  const { userId, address } = useAppSelector(selectAccount);
  const { openAlertModal } = useAlert();
  const [create] = useCreateMutation();
  const [loginHandler] = useLogin();
  const navigate = useNavigate();
  const { loading } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  //* store에 userId가 있으면 넘어가고, 없으면 로그인 함수 실행하는 함수
  const checkLogin = () => {
    if (userId) return;
    const data: OpenAlertArg = {
      content: "민팅을 위해 자동로그인되었습니다.",
      style: "info",
      icon: true,
    };
    openAlertModal(data);
    loginHandler();
  };

  const errorHandler = (message: string) => {
    dispatch(closeLoading());
    let data: OpenAlertArg = {
      content: "에러가 발생했습니다. 다시 시도해주세요.",
      style: "error",
      icon: false,
    };
    if (message === "MetaMask Tx Signature: User denied transaction signature.") {
      data = {
        content: "서명이 거부되었습니다.",
        style: "error",
        icon: false,
      };
    }
    openAlertModal(data);
    return;
  };

  //* 제출한 form
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(openLoading());
    checkLogin();

    //* IPFS에 업로드하는 함수
    try {
      const createData = await createNFT(event);
      if (!createData) return;
      const body = {
        wallet: address,
        metaDataUrl: createData.metadataUrl,
        articleImgUrl: createData.imageUrl,
        owner: userId,
        articleName: createData.title,
      };
      const response = await create(body).unwrap();
      if (!response) return;
      navigate("/");
      const data: OpenAlertArg = {
        content: "민팅이 완료되었습니다",
        style: "success",
        icon: true,
      };
      openAlertModal(data);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      errorHandler(message);
    }
  };

  //* 유효성 검사를 모두 통과하면 Create 버튼이 활성화된다.
  const [isFormTrue, setIsFormTrue] = useState<boolean>(false);
  const [isImageTrue, setIsImageTrue] = useState<boolean>(false);
  const [isTitleTrue, setIsTitleTrue] = useState<boolean>(false);
  const [isLinkTrue, setIsLinkTrue] = useState<boolean>(true);
  useEffect(() => {
    setIsFormTrue(isImageTrue && isTitleTrue && isLinkTrue);
  }, [isImageTrue, isTitleTrue, isLinkTrue]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

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
            Create
          </Button>
        </div>
      </section>
      {loading && createPortal(<LoadingModal />, el)}
    </form>
  );
};

export default Form;
