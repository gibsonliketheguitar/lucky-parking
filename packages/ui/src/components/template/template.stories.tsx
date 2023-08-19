import { Meta, StoryObj } from "@storybook/react";
import Template from "./template";

const meta: Meta<typeof Template> = {
  title: "Components/Modal",
  component: Template,
};

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    //title: "Message",
    //description: "The slime replies back",
  },
  render: (args) => <Template />,
};

export default meta;
