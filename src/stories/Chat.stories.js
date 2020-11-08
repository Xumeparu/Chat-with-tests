import React from 'react';
import Chat from '../components/Chat';
import { action } from "@storybook/addon-actions";

export default {
  title: 'Chat',
  component: Chat
};

const Template = (args) => <Chat {...args} />;

export const Common = Template.bind({});
Common.args = {
  id: "19",
  title: 'My chat',
  clickHandle: action( 'Chat clicked')
};
