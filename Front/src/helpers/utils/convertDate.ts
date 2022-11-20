import { makeNumberDoubleDigits } from "@/helpers/utils/numberConversion";

/**
 * @ description: YY.MM.DD의 형태로 날짜를 변환하는 함수
 */
export const convertYMDWithComma = (date: string): string => {
  const current = new Date(date);
  const year = current.getFullYear().toString().slice(-2);
  const month = (current.getMonth() + 1).toString();
  const day = current.getDate().toString();
  return `${year}.${month.length > 1 ? month : "0" + month}.${day.length > 1 ? day : "0" + day}`;
};

/**
 * @ description: YYYY년 MM월 DD일 HH시 MM분 SS초 형태로 변환하는 함수
 */
export const convertFullDate = (date: string): string => {
  const current = new Date(date);
  const year = makeNumberDoubleDigits(current.getFullYear());
  const month = makeNumberDoubleDigits(current.getMonth() + 1);
  const day = makeNumberDoubleDigits(current.getDate());
  const hours = makeNumberDoubleDigits(current.getHours());
  const minutes = makeNumberDoubleDigits(current.getMinutes());
  const seconds = makeNumberDoubleDigits(current.getSeconds());

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초 `;
};
