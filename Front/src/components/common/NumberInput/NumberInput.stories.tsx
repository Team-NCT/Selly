import { ChangeEvent, useState } from "react";
import { Meta, Story } from "@storybook/react";
import NumberInput from "./NumberInput";
import { NumberInputProps } from "./NumberInput.types";
import { isNumber } from "@/helpers/utils/numberValidation";
import {} from "@/hooks/useInputState";

export default {
  title: "Common/Input/NumberInput",
  component: NumberInput,
  parameters: {
    componentSubtitle: "숫자 Input 컴포넌트: 유효성 검사를 하지 않는 다면 useInputState 활용",
  },
  argTypes: {},
} as Meta;

export const Default: Story<NumberInputProps> = (args) => {
  const [value, setValue] = useState("");

  const checkInputValidation = (inputValue: string) => {
    if (!isNumber(inputValue)) {
      setValue("");
      return;
    }
    //* 유효성 검사가 끝나면 state에 저장
    setValue(inputValue);
  };

  return (
    <div style={{ width: "240px" }}>
      <NumberInput {...args} value={value} handleInputChange={checkInputValidation} />
      {value}
    </div>
  );
};

Default.args = {
  id: "input-text",
  status: true,
};
