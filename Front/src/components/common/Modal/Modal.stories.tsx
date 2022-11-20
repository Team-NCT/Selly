import { Meta, Story } from "@storybook/react";
import Modal from "./Modal";
import { ModalProps } from "./Modal.types";

export default {
  title: "Common/Modal",
  component: Modal,
  parameters: {
    componentSubtitle: "모달 컴포넌트",
  },
  argTypes: {},
} as Meta;

export const Default: Story<ModalProps> = () => (
  <Modal>
    <div>title</div>
  </Modal>
);
