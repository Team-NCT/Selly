/**
 *  @ 입력된 값이 숫자 형태인지 확인하는 함수
 *  @ 숫자면 true를 반환한다.
 */
export const isNumber = (value: string): boolean => {
  return !Number.isNaN(Number(value));
};

/**
 * @ 숫자 입력 시, 정해진 범위 이내의 값인지 확인하는 함수
 * @ 올바른 범위의 값이면 true를 반환합니다.
 */
export const numberinRange = (args: { max: number; min: number; value: number }): boolean => {
  const { max, min, value } = args;
  return value < max && min > value;
};

/**
 * TODO_PJK 소숫점 자리 확인하는 유효성 검사 함수
 *
 */
