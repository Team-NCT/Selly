import { Meta, Story } from "@storybook/react";
import Alert from "./Alert";
import { AlertProps } from "./Alert.types";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default {
  title: "Common/Alert",
  component: Alert,
  parameters: {
    componentSubtitle: "알럿 컴포넌트",
  },
  argTypes: {},
} as Meta;

const content = "로그인이 성공적으로 완료되었습니다.";

export const Default: Story<AlertProps> = (args) => (
  <Provider store={store}>
    <Alert {...args}>{content}</Alert>
  </Provider>
);

Default.args = {
  style: "success",
  icon: false,
};
