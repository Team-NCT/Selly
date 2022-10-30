import { Meta, Story } from "@storybook/react";
import Label from "./Label";
import { LabelProps } from "./Label.types";
import { TextInput } from "@/components/common";
import { useInputState } from "@/hooks/useInputState";

export default {
  title: "Common/Label",
  component: Label,
  parameters: {
    componentSubtitle: "Input 라벨 컴포넌트",
  },
  argTypes: {
    children: { control: { type: "text" } },
    width: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    height: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    vertical: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    horizontal: {
      control: { type: "range", min: 1, max: 100, step: 1 },
    },
    color: { control: { type: "select" } },
    positionH: { control: { type: "radio" } },
    positionW: { control: { type: "radio" } },
  },
} as Meta;

export const Default: Story<LabelProps> = (args) => <Label {...args}>아이디</Label>;

//* 사용 예시
export const LabeledInput: Story<LabelProps> = (args) => {
  const [value, handleInputChange] = useInputState();
  return (
    <div style={{ width: "30%" }}>
      <Label {...args}>Username</Label>
      <TextInput
        id="input-text"
        value={value}
        handleInputChange={handleInputChange}
        status={true}
        maxLength={10}
      />
    </div>
  );
};

Default.args = {
  id: "input-text",
  width: 55,
  height: 60,
  vertical: 10,
  horizontal: 10,
  color: "muscat",
  positionH: "bottom",
  positionW: "right",
};

LabeledInput.args = {
  id: "input-text",
  width: 30,
  height: 60,
  vertical: 10,
  horizontal: 10,
  color: "ocean",
  positionH: "bottom",
  positionW: "right",
};
