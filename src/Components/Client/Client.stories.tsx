import React from "react";
import { Client } from ".";
import { Decorator } from "../../storybook";

export default {
  title: "Components/Client",
  decorators: [Decorator],
  component: Client,
};

export const Primary = (args: Parameters<typeof Client>[0]) => (
  <>
    <Client {...args}>コンテンツ</Client>
  </>
);
Primary.parameters = {
  viewMode: "docs",
};
