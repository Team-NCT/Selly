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

export const Default: Story<AlertProps> = (args) => <Alert {...args} />;
