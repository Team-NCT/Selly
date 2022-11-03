/**
 * @ description: YY.MM.DD의 형태로 날짜를 변환하는 함수
 */
export const convertYMDWithComma = (date: string): string => {
  const current = new Date(date);
  const year = current.getFullYear().toString().slice(-2);
  const month = current.getMonth().toString();
  const day = current.getDate().toString();
  return `${year}.${month.length > 1 ? month : "0" + month}.${day.length > 1 ? day : "0" + day}`;
};
