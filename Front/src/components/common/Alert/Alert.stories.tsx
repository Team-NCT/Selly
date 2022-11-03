import { Meta, Story } from "@storybook/react";
import Alert from "./Alert";
import { AlertProps } from "./Alert.types";

export default {
  title: "Common/Alert",
  component: Alert,
  parameters: {
    componentSubtitle: "알럿 컴포넌트",
  },
  argTypes: {},
} as Meta;

const content = "로그인이 성공적으로 완료되었습니다.";

export const Default: Story<AlertProps> = (args) => <Alert {...args}>{content}</Alert>;

Default.args = {
  style: "success",
  icon: false,
};
