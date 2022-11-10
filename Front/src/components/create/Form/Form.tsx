import React, { useEffect, useState } from "react";
import { Button } from "@/components/common";
import { Description, Image, Title, Link, Property } from "./components";
import { createNFT } from "@/api/IPFS";
import style from "./Form.module.scss";
import { useCreateMutation } from "@/api/server/createNFTAPI";
import { selectAccount } from "@/store/loginSlice";
import { useAppSelector } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { changeNetwork, getChainId } from "@/helpers/service";
import { GOERLI_ID } from "@/constants/metamask";
import Web3 from "web3";

const Form = () => {
  const navigate = useNavigate();
  const [create] = useCreateMutation();
  const { account } = useAppSelector(selectAccount);
  const web3 = new Web3(window.ethereum);

  //* 네트워크가 goeril이 아니면 goeril로 변경하는 함수
  const checkNetwork = async () => {
    if (window.ethereum) {
      const chainId = await getChainId();

      //* 네트워크 변경 로직
      if (GOERLI_ID !== chainId) {
        changeNetwork(GOERLI_ID);
      }
      return;
    }
  };

  //* 제출한 form
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    checkNetwork();
    //* IPFS에 업로드하는 함수
    try {
      const createData = await createNFT(event);
      if (!createData) return;
      const body = {
        wallet: account.address,
        metaDataUrl: createData.metadataUrl,
        articleImgUrl: createData.imageUrl,
        owner: 46,
        articleName: createData.title,
      };
      const response = await create(body).unwrap();
      const payload = {
        nonce: response.nonce,
        to: response.to,
        from: response.from,
        data: response.data,
      };
      await web3.eth.sendTransaction(payload);
      navigate("/");
    } catch (error) {
      console.log(error);
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
