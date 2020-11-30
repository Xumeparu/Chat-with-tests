import React from 'react';
import ChatForm from '../components/ChatForm/ChatForm';
import { action } from '@storybook/addon-actions';

export default {
    title: 'ChatForm',
    component: ChatForm
};

const Template = (args) => <ChatForm {...args} />;

export const Common = Template.bind({});
Common.args = {
    handleSubmit: action('submit')
};
