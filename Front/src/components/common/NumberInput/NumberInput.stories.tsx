import { useCallback } from "react";
import { Meta, Story } from "@storybook/react";
import NumberInput from "./NumberInput";
import { NumberInputProps } from "./NumberInput.types";
import { isNumber } from "@/helpers/utils/numberValidation";
import { useInputState } from "@/hooks";

export default {
  title: "Common/Input/NumberInput",
  component: NumberInput,
  parameters: {
    componentSubtitle: "숫자 Input 컴포넌트: 유효성 검사를 하지 않는 다면 useInputState 활용",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NumberInputProps> = (args) => {
  //* 유효성 검사 함수
  const checkInputValidation = useCallback((value: string) => {
    if (!isNumber(value)) {
      //! 에러 메시지 수정, 인풋 상태 수정
      return "";
    }
    //* 유효성 검사가 끝나면 state에 저장
    return value;
  }, []);

  //유효성 검사를 해야 한다면, 뒤에 유효성 검사를 하는 함수를 기입
  const [value, handleValueChange] = useInputState("", checkInputValidation);

  return (
    <div style={{ width: "240px" }}>
      <NumberInput {...args} value={value} handleValueChange={handleValueChange} />
      {value}
    </div>
  );
};

Default.args = {
  id: "input-text",
  status: true,
};
