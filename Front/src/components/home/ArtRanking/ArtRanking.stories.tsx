import { Meta, Story } from "@storybook/react";
import ArtRanking from "./ArtRanking";

export default {
  title: "Home/ArtRanking/ArtRanking",
  component: ArtRanking,
  parameters: {
    componentSubtitle: "작품 랭킹 아이템 캐러셀",
  },
  argTypes: {},
} as Meta;

export const Default: Story = (args) => <ArtRanking {...args} />;
