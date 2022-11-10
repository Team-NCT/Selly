import { Meta, Story } from "@storybook/react";
import SignBoxList from "./SignBoxList";
import { SignBoxListProps } from "./SignBoxList.types";

export default {
  title: "Sell/SignBox/SignBoxList",
  component: SignBoxList,
  parameters: {
    componentSubtitle: "NFT 선택 카드 리스트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<SignBoxListProps> = (args) => <SignBoxList {...args} />;

const defaultProps = {
  title: "금고 생성하기",
  desc: "NFT의 조각을 생성하기 위해서 NFT를 보관할 금고를 생성하여야 합니다.",
  signFunction: async () => {
    console.log("이얏호!!");
    return true;
  },
};

Default.args = {
  data: [
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
    defaultProps,
  ],
};
