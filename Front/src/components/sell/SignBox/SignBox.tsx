import { useState } from "react";
import style from "./SignBox.module.scss";
import { SignBoxProps } from "./SignBox.types";
import { Neon, Button } from "@/components/common";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { selectSignData } from "@/store/signDataSlice";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { selectSellInfo } from "@/store/sellInfoSlice";
import { selectAccount } from "@/store/loginSlice";
import { useSaleNFTMutation } from "@/api/server/saleNFTAPI";
import { functionProps } from "@/components/Sell/SignBox/SignBox.types";
import { PencilIcon } from "@/components/icon";
import { closeLoading, openLoading } from "@/store/modalSlice";
import { openAlert, setAlertContent, setAlertStyles, setIconStyles } from "@/store/alertSlice";

import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const SignBox = ({ title, desc, idx, isActive, signFunction, goNext, setValue }: SignBoxProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [signable, setSignable] = useState(true);
  const [buttonText, setButtonText] = useState("서명하기");

  const { address, userId } = useAppSelector(selectAccount);
  const { F_NFTCA } = useAppSelector(selectSignData);
  const { CA, tokenId, metaDataUrl, articleName, articleUrl } = useAppSelector(selectNFTValue);
  const { category, code, num, price } = useAppSelector(selectSellInfo);

  const dispatch = useAppDispatch();

  const [createSale] = useSaleNFTMutation();

  //* 서버 API 불러오는 마지막 함수
  const Onsale = async ({
    CA,
    tokenId,
    num,
    articleName,
    F_NFTCA,
    userWallet,
    userId,
    metaDataUrl,
    articleUrl,
    category,
    price,
  }: functionProps) => {
    const body = {
      contractAddress: CA,
      ownershipContractAddress: F_NFTCA,
      tokenId: tokenId,
      seller: userId,
      pieceCnt: num,
      tradePrice: Number(price),
      category: category,
      wallet: userWallet,
      articleUrl,
      articleName,
      metaDataUrl,
    };
    console.log(body);
    const response = await createSale(body).unwrap();
    console.log("응답", response);
    return response;
  };

  const testHandler = () => {
    if (!address || !userId) return;
    const userWallet = address;

    Onsale({
      CA,
      tokenId,
      num,
      articleName,
      code,
      F_NFTCA,
      setValue,
      userWallet,
      userId,
      metaDataUrl,
      articleUrl,
      category,
      price,
    }).then((res) => {
      if (res) {
        setIsCompleted(true);
        goNext(idx);
      } else {
        setButtonText("서명하기");
        setSignable(true);
        alert("블록체인 통신 상태 ERROR");
        console.error("블록체인 통신 상태 ERROR");
      }
    });
  };

  const onClickHandler = () => {
    if (!address || !userId) return;
    const userWallet = address;

    setSignable(false);
    setButtonText("서명 중");
    dispatch(openLoading());
    if (!signFunction) {
      Onsale({
        CA,
        tokenId,
        num,
        articleName,
        code,
        F_NFTCA,
        setValue,
        userWallet,
        userId,
        metaDataUrl,
        articleUrl,
        category,
        price,
      }).then((res) => {
        if (res) {
          setIsCompleted(true);
          goNext(idx);
        } else {
          setButtonText("서명하기");
          setSignable(true);
          alert("블록체인 통신 상태 ERROR");
          console.error("블록체인 통신 상태 ERROR");
        }
      });
      return;
    }

    signFunction({
      CA,
      tokenId,
      num,
      articleName,
      code,
      F_NFTCA,
      setValue,
      userWallet,
      userId,
      metaDataUrl,
      articleUrl,
      category,
      price,
    }).then((res) => {
      dispatch(closeLoading());
      if (res) {
        setIsCompleted(true);
        goNext(idx);
      } else {
        setButtonText("서명하기");
        setSignable(true);
        dispatch(openAlert());
        dispatch(setAlertContent("블록체인 통신 ERROR"));
        dispatch(setAlertStyles("error"));
        dispatch(setIconStyles(false));
      }
    });
  };

  return (
    <div className={style.sign_box}>
      <div
        className={
          `${style.sign_box_idx} ` +
          (isActive ? `${style.is_active} ` : "") +
          (isCompleted ? `${style.is_completed} ` : "")
        }>
        {idx}
      </div>
      <div className={`${style.sign_box_section} ` + (isCompleted ? `${style.is_completed}` : "")}>
        <div className={style.pencil_icon}>
          <PencilIcon />
        </div>
        <div className={style.content_section}>
          <h1 className={style.sign_box_title}>
            <Neon
              color="muscat"
              positionH="top"
              positionW="right"
              width={isActive ? 60 : 0}
              height={70}
              horizontal={4}>
              {title}
            </Neon>
          </h1>
          <p className={style.sign_box_desc}>{desc}</p>
          {isActive && (
            <Button size="fillContainer" onClick={onClickHandler} disabled={!signable}>
              {buttonText}
            </Button>
          )}
        </div>
      </div>
      <Button size="fillContainer" onClick={testHandler}>
        서명
      </Button>
    </div>
  );
};
export default SignBox;
