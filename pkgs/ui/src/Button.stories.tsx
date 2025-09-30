import type { Meta, StoryObj } from "@storybook/react";
import type { IconId } from "@wrkspc/icons";

import iconSolidThumbtack from "@wrkspc/icons/svg/solid/thumbtack.js";
import { Button } from "./Button";

const demoIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z'/%3E%3C/svg%3E" as IconId;

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Mindrig design system button with shared icon/tag helpers. Stories demonstrate both button and link modes.",
      },
    },
  },
  args: {
    size: "medium",
    color: "primary",
    style: "solid",
    align: "auto",
    children: "Trigger Action",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xsmall", "small", "medium", "large"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "cta", "action", "danger"],
    },
    style: {
      control: "select",
      options: ["solid", "transparent", "label"],
    },
    align: {
      control: "select",
      options: ["auto", "start"],
    },
    icon: {
      control: "text",
      description: "Icon asset URL or config object",
    },
    tag: {
      control: "text",
    },
    slot: {
      control: "select",
      options: [null, "action", "toolbar"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    color: "secondary",
    children: "Secondary action",
  },
};

export const WithIconAndTag: Story = {
  args: {
    icon: demoIcon,
    tag: "Beta",
    children: "Deploy",
  },
};

export const AsLink: Story = {
  args: {
    href: "https://mindrig.dev",
    target: "_blank",
    rel: "noreferrer",
    children: "Open Docs",
  },
};

export const CurrentColorSolid: Story = {
  args: {
    color: "current",
    style: "solid",
    children: "Log In",
  },
};

export const CurrentColorTransparent: Story = {
  args: {
    color: "current",
    style: "transparent",
    children: "Log In",
  },
};

export const CurrentColorIcon: Story = {
  args: {
    color: "current",
    style: "label",
    icon: iconSolidThumbtack,
    children: null,
  },
};
