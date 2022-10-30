import { Meta, Story } from "@storybook/react";
import ProfileImage from "./ProfileImage";
import { ProfileImageProps, size } from "./ProfileImage.types";

export default {
  title: "Common/ProfileImage",
  component: ProfileImage,
  parameters: {
    componentSubtitle: "이미지 카드 모양 컴포넌트",
  },
  argTypes: {
    size: {
      options: size,
      control: "select",
    },
    profileStyle: {
      option: ["round", "square"],
      control: "select",
    },
  },
} as Meta;

export const Default: Story<ProfileImageProps> = (args) => <ProfileImage {...args} />;

Default.args = {
  url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  size: "lg",
  profileStyle: "round",
};
