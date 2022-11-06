/* 숫자 Input 유효성 검사 함수 */

/**
 *  @ description: 입력된 값이 숫자 형태인지 확인하는 함수
 *  @ 숫자면 true를 반환한다.
 */
export const isNumber = (value: string): boolean => {
  return !Number.isNaN(Number(value));
};

/**
 * @ description: 숫자형태 문자열 입력 시, 정해진 범위 이내의 값인지 확인하는 함수
 * @ 올바른 범위의 값이면 true를 반환합니다.
 */
export const numberinRange = (max: number, min: number, value: string): boolean => {
  const number = Number(value);
  return number < max && min > number;
};

/**
 * @ description: 숫자 형태 문자열 입력 시, 해당 값이 정해진 소숫점 자리 수 이하인지 확인하는 함수
 * @ 올바른 범위의 값이면 true를 반환한다.
 * @ params: 숫자 형태의 문자열, 제한되는 소숫점 자리 수
 * ex) value: 0.01 limit:4 => true
 * ex) value: 0.0025 limit: 4 => true
 * ex) value: 0.00025 limit: 4 => false
 */
export const fPointCheck = (value: string, limit: number) => {
  if (!value.includes(".")) return true;
  const decimal = value.substring(value.indexOf("."));
  return decimal.length - 1 <= limit;
};
