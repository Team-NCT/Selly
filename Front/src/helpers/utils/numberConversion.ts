/* 숫자 관련 유틸 함수 */

//@ description: 숫자 3자리 마다 콤마 넣는 유틸 함수
export const numberAddComma = (arg: number) => {
  return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
