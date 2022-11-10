import { Meta, Story } from "@storybook/react";
import SignBox from "./SignBox";
import { SignBoxProps } from "./SignBox.types";

export default {
  title: "Sell/SignBox/SignBox",
  component: SignBox,
  parameters: {
    componentSubtitle: "서명 박스",
  },
  argTypes: {},
} as Meta;

export const Default: Story<SignBoxProps> = (args) => <SignBox {...args} />;

Default.args = {
  title: "금고 생성하기",
  desc: "NFT의 조각을 생성하기 위해서 NFT를 보관할 금고를 생성하여야 합니다.",
  idx: 1,
  isActive: true,
};
