// scss에 대한 모듈 형식을 선언
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

// image에 대한 모듈 형식을 선언
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

interface Window {
  Kakao: any;
}
