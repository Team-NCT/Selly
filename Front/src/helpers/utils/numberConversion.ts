/* 숫자 관련 유틸 함수 */

//@ description: 숫자 3자리 마다 콤마 넣는 유틸 함수
export const numberAddComma = (arg: number) => {
  return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//@ description: 한자리 숫자이면, 앞에 0을 붙이는 함수
export const makeNumberDoubleDigits = (num: number): string => {
  return num.toString().length > 1 ? num.toString() : "0" + num.toString();
};
