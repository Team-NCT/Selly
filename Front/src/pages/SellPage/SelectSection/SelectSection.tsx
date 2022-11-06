import React, { useState } from "react";
import { SelectCardList } from "@/components";
import style from "./SelectSection.module.scss";

const defaultProps = {
  url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  title: "좀비와 함께 춤을",
};

const data = [
  defaultProps,
  defaultProps,
  defaultProps,
  defaultProps,
  defaultProps,
  defaultProps,
  defaultProps,
];

function SelectSection() {
  return (
    <>
      <div className={style.step_title}>
        <h2>판매 정보 등록</h2>
        <p>{">"}</p>
        <h2>서명하기</h2>
      </div>
      <h3 className={style.desc}>판매할 NFT를 선택하고, 판매 정보를 입력해주세요.</h3>
      <SelectCardList data={data} />
    </>
  );
}

export default SelectSection;
