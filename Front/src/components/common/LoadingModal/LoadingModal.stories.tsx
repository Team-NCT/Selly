import { Meta, Story } from "@storybook/react";
import LoadingModal from "./LoadingModal";

export default {
  title: "Common/LoadingModal",
  component: LoadingModal,
  parameters: {
    componentSubtitle: "로딩 모딜 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story = () => <LoadingModal />;
