import { Button } from "@/components/common";
import React, { useState } from "react";
import { Description, Image, Title, Link, Property } from "./components";

const Form = () => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(e.target);
    console.log("test", e.target[0].files);
  };
  //* 이미지 file
  const [imageFile, setImageFile] = useState<File>();
  return (
    <>
      <form id="create-form" onSubmit={(e) => submitHandler(e)}>
        <Image></Image>
        <Title></Title>
        <Description></Description>
        <Link></Link>
        <button></button>
        <Property></Property>
        <Button form="create-form">create</Button>
      </form>
    </>
  );
};

export default Form;
