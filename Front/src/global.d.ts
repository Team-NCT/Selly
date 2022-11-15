// scss에 대한 모듈 형식을 선언
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

// image에 대한 모듈 형식을 선언
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

interface Window {
  Kakao: any;
  ethereum: any;
}

//* 에러에 대한 묘듈 형식을 선언
declare interface Error {
  name: string;
  message: string;
  stack?: string;
  code?: number | string;
}
